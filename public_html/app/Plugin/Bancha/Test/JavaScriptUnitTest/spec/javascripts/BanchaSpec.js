/*!
 *
 * Bancha Project : Combining Ext JS and CakePHP (http://banchaproject.org)
 * Copyright 2011-2012 Roland Schuetz, Kung Wong, Andreas Kern, Florian Eckerstorfer
 *
 * Tests for the main Bancha class
 *
 * @copyright     Copyright 2011-2012 Roland Schuetz
 * @link          http://banchaproject.org Bancha Project
 * @author        Roland Schuetz <mail@rolandschuetz.at>
 * @version       Bancha v PRECOMPILER_ADD_RELEASE_VERSION
 *
 * For more information go to http://banchaproject.org
 */
/*jslint browser: true, vars: true, undef: true, nomen: true, eqeq: false, plusplus: true, bitwise: true, regexp: true, newcap: true, sloppy: true, white: true */
/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, noempty:true, regexp:true, undef:true, trailing:false */
/*global Ext, Bancha, describe, it, beforeEach, expect, jasmine, Mock, ExtSpecHelper, BanchaSpecHelper, BanchaObjectFromPathTest */

describe("Bancha Singleton - basic retrieval functions on the stubs and model meta data", function() {
        var rs = BanchaSpecHelper.SampleData.remoteApiDefinition, // remote sample
            h = BanchaSpecHelper; // helper shortcut
    
        beforeEach(h.reset);
        
        it("internally uses objectFromPath to retrieve objects", function() {
            // simple unit tests
            window.BanchaObjectFromPathTest = {
                object: {
                    property: 2
                },
                array: ['a','b', {
                    property: 3
                }]
            };
            
            // successfulles
            expect(Bancha.objectFromPath('BanchaObjectFromPathTest.object.property')).toEqual(2);
            expect(Bancha.objectFromPath('object.property',BanchaObjectFromPathTest)).toEqual(2);
            expect(Bancha.objectFromPath('property',BanchaObjectFromPathTest['object'])).toEqual(2);
            
            expect(Bancha.objectFromPath('BanchaObjectFromPathTest.array.2.property')).toEqual(3);
            expect(Bancha.objectFromPath('2.property',BanchaObjectFromPathTest.array)).toEqual(3);
            expect(Bancha.objectFromPath('1',BanchaObjectFromPathTest.array)).toEqual('b');
            expect(Bancha.objectFromPath(1,BanchaObjectFromPathTest.array)).toEqual('b');
            
            expect(Bancha.objectFromPath('BanchaObjectFromPathTest')).toEqual(BanchaObjectFromPathTest);
            
            // can't find these pathes
            expect(Bancha.objectFromPath('')).toBeFalsy();
            expect(Bancha.objectFromPath('',BanchaObjectFromPathTest)).toBeFalsy();
            expect(Bancha.objectFromPath()).toBeFalsy();
            expect(Bancha.objectFromPath({})).toBeFalsy();
            expect(Bancha.objectFromPath(undefined)).toBeFalsy();
            expect(Bancha.objectFromPath(null)).toBeFalsy();
        });
        
        it("should return the stubs namespace on getStubsNamespace() if already instanciated", function() {
            h.init();
    
            var ns = Bancha.getStubsNamespace();
        
            expect(ns).toBeDefined();
            expect(ns.User).toBeDefined();
            expect(ns.User.create).toBeDefined(); // looks good
        });
    
    
        it("should in debug mode return an expection when calling getRemoteApi() before init()", function() {
            if(Bancha.debugVersion) {
                expect(function() {
                    Bancha.getRemoteApi();
                }).toThrowExtErrorMsg("Bancha: The remote api Bancha.REMOTE_API is not yet defined, "+
                                      "please define the api before using Bancha.getRemoteApi().");
            }
        });
    
    
        it("should return the remote api if already defined in js with getRemoteApi()", function() {
            h.init();
        
            var api = Bancha.getRemoteApi();
            expect(api).property("type").toEqual("remoting");
        });
    
    
        it("should init all stubs on init()", function() {
            expect(Bancha.init).toBeAFunction();

            // setup test data
            Bancha.REMOTE_API = Ext.clone(rs);
        
            // test
            Bancha.init();
        
            expect(Bancha.initialized).toBeTruthy();

            //var expected = {
            //    User: {
            //        "create":fn,
            //        "delete":fn
            //    }
            //};

            //check created stubs
            expect(Bancha.RemoteStubs).property("User.create").toBeAFunction(); //"The RemoteStub User supports create"
            expect(Bancha.RemoteStubs).property("User.destroy").toBeAFunction(); //"The RemoteStub User supports create"
        });

    
        it("should return if a metadata is loaded with modelMetaDataIsLoaded()", function() {
            h.init();
        
            expect(Bancha.modelMetaDataIsLoaded('Phantasy')).toBeFalsy(); // doesn't exist
            expect(Bancha.modelMetaDataIsLoaded('User')).toBeTruthy(); // remote object exists
          });


        it("should return is a model is loaded with isRemoteModel after init", function() {
            h.init();

            expect(Bancha.isRemoteModel('Phantasy')).toBeFalsy(); // doesn't exist
            expect(Bancha.isRemoteModel('User')).toBeTruthy(); // remote object exists
        });
     
     
        it("Check Bancha.getModelMetaData function", function() {
            h.init();

            expect(Bancha.getModelMetaData('Phantasy')).toBeNull(); // doesn't exist
            expect(Bancha.getModelMetaData('User')).property('fields.2.name').toEqual('login'); // it's really the metadata
        });
    
    
        it("should preload model meta data using the direct stub", function() {
            h.init();
      
            // create direct stub mock
            var mock = Mock.Proxy();
            mock.expectRPC("loadMetaData",['PreloadTestUser','PreloadTestArticle']);
            Bancha.RemoteStubs.Bancha = mock;
            
            // execute test
            Bancha.preloadModelMetaData(['PreloadTestUser','PreloadTestArticle']);
            mock.verify();
            
            // now fake answer
            var result = {
                PreloadTestUser: {
                    fields: [
                        {name:'id', type:'int'},
                        {name:'name', type:'string'},
                        {name:'login', type:'string'},
                        {name:'created', type:'date'},
                        {name:'email', type:'string'},
                        {name:'avatar', type:'string'},
                        {name:'weight', type:'float'},
                        {name:'height', type:'float'}
                    ],
                    validations: [
                        {type:'length', name:'name', min:4, max:64},
                        {type:'length', name:'login', min:3, max:64},
                        {type:'length', name:'email', min:5, max:64},
                        {type:'length', name:'avatar', max:64},
                        {type:'length', name:'weight', max:64}
                    ],
                    sorters: [{
                        property: 'name',
                        direction: 'ASC'
                    }]
                },
                PreloadTestArticle: {
                    fields: [
                        {name:'id', type:'int'},
                        {name:'name', type:'string'}
                    ]
                }
            };
            mock.callLastRPCCallback("loadMetaData",[result]);
            
            // now see if is is available
            expect(Bancha.modelMetaDataIsLoaded('PreloadTestUser')).toBeTruthy();
            expect(Bancha.modelMetaDataIsLoaded('PreloadTestArticle')).toBeTruthy();
        
            // check model by sample field
            expect(Bancha.getModelMetaData('PreloadTestUser')).property('fields.2.name').toEqual('login');
        });
    
    
        it("should allow to just give a string as argument when preloading only one model meta data", function() {
            h.init();
      
            // create direct stub mock
            var mock = Mock.Proxy();
            mock.expectRPC("loadMetaData",['PreloadSingleTestUser']);
            Bancha.RemoteStubs.Bancha = mock;

            // execute test
            Bancha.preloadModelMetaData('PreloadSingleTestUser');
            mock.verify();
        });
    
    
        it("should throw an error in debug mode / returns false in prodiction mode "+
            "when Bancha#createModel is called for a not yet loaded metadata of a model", function() {
            
            // prepare a remote api without the user metadata
            Bancha.REMOTE_API = Ext.clone(rs);
            delete Bancha.REMOTE_API.metadata.User;
            
            // init
            Bancha.init();
            
            // now test
            expect(function() {
                
                // in debug mode this should throw an error
                var result = Bancha.createModel('User');
                
                // in production mode var result should be false, so 
                // throw an error to pass the test for production code
                if(result===false) {
                    throw 'Bancha: Couldn\'t create the model cause the metadata is not loaded yet, '+
                          'please use onModelReady instead.';
                }
            }).toThrowExtErrorMsg('Bancha: Couldn\'t create the model cause the metadata is not loaded yet, '+
                                  'please use onModelReady instead.');
        });
        
        
        it("should create Models with Bancha#createModel", function() {
            
            // setup model metadata
            h.init('CreateModelUser');

            // create a mock object for the proxy
            var mockProxy = Mock.Proxy();
            
            // should create a user defintion
            expect(
                Bancha.createModel('CreateModelUser', {
                    additionalSettings: true,
                    proxy: mockProxy
            })).toBeTruthy();
            
            // check if the model really got created
            var model = Ext.ClassManager.get('Bancha.model.CreateModelUser');
            expect(model).toBeModelClass('Bancha.model.CreateModelUser');
            
            // check if the additional config was used
            if(ExtSpecHelper.isExt) {
                // for ext it is directly applied
                expect(model.prototype.additionalSettings).toBeTruthy();
            } else {
                // for touch it is applied inside the 'config' config
                expect(model.prototype.config.additionalSettings).toBeTruthy();
            }

            // test if the model saves data through ext direct
            var user = Ext.create('Bancha.model.CreateModelUser',{
                firstname: 'Micky',
                lastname: 'Mouse'
            });

            // define expectations for remote stub calls
            // user.save() should result in one create action
            mockProxy.expect("create");

            // test
            user.save();
            
            //verify the expectations were met
            // TODO Not yet working in touch: http://www.sencha.com/forum/showthread.php?188764-How-to-mock-a-proxy
            if(ExtSpecHelper.isExt)
            mockProxy.verify();
            
        });

        it("should create a model if not defined with Bancha.getModel", function() {
        
            // setup model metadata
            h.init("GetModelCreateTestUser");
         
            // create model
            var model = Bancha.getModel('GetModelCreateTestUser');
            expect(model).toBeModelClass('Bancha.model.GetModelCreateTestUser');
             
        });
        
        it("should just return the already defined models with Bancha.getModel", function() {
        
            // setup model metadata
             h.init("GetModelJustGetTestUser");
         
             // create model
             var created = Bancha.createModel('GetModelJustGetTestUser',{
                 createdWithCreate: true
             });
             expect(created).toBeTruthy();
             
             // now test getModel
             var model = Bancha.getModel('GetModelJustGetTestUser');
             expect(model).toBeModelClass('Bancha.model.GetModelJustGetTestUser');
             
             // check if it has the correct config
             if(ExtSpecHelper.isExt) {
                 // for ext configs are directly applied
                 expect(model.prototype.createdWithCreate).toBeTruthy();
             } else {
                 // for touch configs are applied inside the 'config' config
                 expect(model.prototype.config.createdWithCreate).toBeTruthy();
             }
             
        });

        it("should load all needed models on onModelReady and fire functions after the model is ready for a single modelname input", function() {
            h.init();
      
            // create direct stub mock
            var mock = Mock.Proxy();
            Bancha.RemoteStubs.Bancha = mock;
        
            // should be called after model is loaded
            var onReadySpy = jasmine.createSpy();
            
            // if the model is not present it should load the model
            mock.expectRPC("loadMetaData",['OnModelReadyTestModel']);
            Bancha.onModelReady('OnModelReadyTestModel', onReadySpy);
            // model should be loading from server now
            mock.verify();

            // it should NOT execute the function before the model is loaded
            expect(onReadySpy.callCount).toEqual(0);
            
            // fake that the model is a remote model (supports CRUD operations to the server)
            Bancha.getStubsNamespace().OnModelReadyTestModel = Bancha.getStubsNamespace().User;
            
            // now fake answer
            var result = {
                'OnModelReadyTestModel': {
                    idProperty: 'id',
                    fields: [
                        {name:'id', type:'int'},
                        {name:'name', type:'string'}
                    ]
                }
            };
            mock.callLastRPCCallback("loadMetaData",[result]);

            // now the function should be called
            expect(onReadySpy.callCount).toEqual(1);

            // when the model is loaded it should just execute the function
            Bancha.onModelReady('OnModelReadyTestModel', onReadySpy);
            expect(onReadySpy.callCount).toEqual(2);
            
        });
        
        it("should load all needed models on onModelReady and fire functions after the model is ready for an array of modelnames as input", function() {
            h.init();
      
            // create direct stub mock
            var mock = Mock.Proxy();
            Bancha.RemoteStubs.Bancha = mock;
        
            // should be called after model is loaded
            var onReadySpy = jasmine.createSpy();
            
            // bancha should also expect multiple models
            mock.expectRPC("loadMetaData",['OnModelReadyMultipleModelsTestModel1','OnModelReadyMultipleModelsTestModel2']);
            Bancha.onModelReady(['OnModelReadyMultipleModelsTestModel1','OnModelReadyMultipleModelsTestModel2'], onReadySpy);
            // model should be loading from server now
            mock.verify();
            
            // it should NOT execute the function before the model is loaded
            expect(onReadySpy.callCount).toEqual(0);
            
            // fake that the model is a remote model (supports CRUD operations to the server)
            Bancha.getStubsNamespace().OnModelReadyMultipleModelsTestModel1 = Bancha.getStubsNamespace().User;
            Bancha.getStubsNamespace().OnModelReadyMultipleModelsTestModel2 = Bancha.getStubsNamespace().User;
            
            // now fake answer
            var result = {
            'OnModelReadyMultipleModelsTestModel1': {
                idProperty: 'id',
                fields: [
                    {name:'id', type:'int'},
                    {name:'name', type:'string'}
                ]
            },
            'OnModelReadyMultipleModelsTestModel2': {
                idProperty: 'id',
                fields: [
                    {name:'id', type:'int'},
                    {name:'name', type:'string'}
                ]
            }
            };
            mock.callLastRPCCallback("loadMetaData",[result]);

            // now the function should be called
            expect(onReadySpy.callCount).toEqual(1);
        });
        
}); //eo describe basic functions
    
//eof
