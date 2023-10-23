'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">back documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-18430ad1e0497f1f6b235419989eb7a54580817fab6d2f7146855f7cf368a7504537b276519d25ba3e0ab5ca9b3ece28407226298742b2b22f654ea0ddc3cdff"' : 'data-target="#xs-controllers-links-module-AppModule-18430ad1e0497f1f6b235419989eb7a54580817fab6d2f7146855f7cf368a7504537b276519d25ba3e0ab5ca9b3ece28407226298742b2b22f654ea0ddc3cdff"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-18430ad1e0497f1f6b235419989eb7a54580817fab6d2f7146855f7cf368a7504537b276519d25ba3e0ab5ca9b3ece28407226298742b2b22f654ea0ddc3cdff"' :
                                            'id="xs-controllers-links-module-AppModule-18430ad1e0497f1f6b235419989eb7a54580817fab6d2f7146855f7cf368a7504537b276519d25ba3e0ab5ca9b3ece28407226298742b2b22f654ea0ddc3cdff"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-3d3d70751547d97da97398e045b21430e657b40633233c8b6a8793657daa11b732b812e5d6a77d81b689c731d846e4053be1a10b7f8f57fab8a1c4766f1e4534"' : 'data-target="#xs-injectables-links-module-AuthModule-3d3d70751547d97da97398e045b21430e657b40633233c8b6a8793657daa11b732b812e5d6a77d81b689c731d846e4053be1a10b7f8f57fab8a1c4766f1e4534"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-3d3d70751547d97da97398e045b21430e657b40633233c8b6a8793657daa11b732b812e5d6a77d81b689c731d846e4053be1a10b7f8f57fab8a1c4766f1e4534"' :
                                        'id="xs-injectables-links-module-AuthModule-3d3d70751547d97da97398e045b21430e657b40633233c8b6a8793657daa11b732b812e5d6a77d81b689c731d846e4053be1a10b7f8f57fab8a1c4766f1e4534"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TweetModule.html" data-type="entity-link" >TweetModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TweetModule-a2565a54ab0042a80c529fb0b9cc9e5eb6329a6a8901de1e14d9e176dcbfa909372465738ee55b482552e5797493b147df00506cdc8522e35309de2243d0b5f1"' : 'data-target="#xs-controllers-links-module-TweetModule-a2565a54ab0042a80c529fb0b9cc9e5eb6329a6a8901de1e14d9e176dcbfa909372465738ee55b482552e5797493b147df00506cdc8522e35309de2243d0b5f1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TweetModule-a2565a54ab0042a80c529fb0b9cc9e5eb6329a6a8901de1e14d9e176dcbfa909372465738ee55b482552e5797493b147df00506cdc8522e35309de2243d0b5f1"' :
                                            'id="xs-controllers-links-module-TweetModule-a2565a54ab0042a80c529fb0b9cc9e5eb6329a6a8901de1e14d9e176dcbfa909372465738ee55b482552e5797493b147df00506cdc8522e35309de2243d0b5f1"' }>
                                            <li class="link">
                                                <a href="controllers/TweetController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TweetController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TweetModule-a2565a54ab0042a80c529fb0b9cc9e5eb6329a6a8901de1e14d9e176dcbfa909372465738ee55b482552e5797493b147df00506cdc8522e35309de2243d0b5f1"' : 'data-target="#xs-injectables-links-module-TweetModule-a2565a54ab0042a80c529fb0b9cc9e5eb6329a6a8901de1e14d9e176dcbfa909372465738ee55b482552e5797493b147df00506cdc8522e35309de2243d0b5f1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TweetModule-a2565a54ab0042a80c529fb0b9cc9e5eb6329a6a8901de1e14d9e176dcbfa909372465738ee55b482552e5797493b147df00506cdc8522e35309de2243d0b5f1"' :
                                        'id="xs-injectables-links-module-TweetModule-a2565a54ab0042a80c529fb0b9cc9e5eb6329a6a8901de1e14d9e176dcbfa909372465738ee55b482552e5797493b147df00506cdc8522e35309de2243d0b5f1"' }>
                                        <li class="link">
                                            <a href="injectables/TweetService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TweetService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-629b71c10f5191a70ce44a300afc2e9b9ab9a4d387df71ca2d4cf5c59157e8a29750b0663ee6920c1ee72ebced7d72d61a211ad05f5c70bbc349964e8b3b00c1"' : 'data-target="#xs-controllers-links-module-UsersModule-629b71c10f5191a70ce44a300afc2e9b9ab9a4d387df71ca2d4cf5c59157e8a29750b0663ee6920c1ee72ebced7d72d61a211ad05f5c70bbc349964e8b3b00c1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-629b71c10f5191a70ce44a300afc2e9b9ab9a4d387df71ca2d4cf5c59157e8a29750b0663ee6920c1ee72ebced7d72d61a211ad05f5c70bbc349964e8b3b00c1"' :
                                            'id="xs-controllers-links-module-UsersModule-629b71c10f5191a70ce44a300afc2e9b9ab9a4d387df71ca2d4cf5c59157e8a29750b0663ee6920c1ee72ebced7d72d61a211ad05f5c70bbc349964e8b3b00c1"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-629b71c10f5191a70ce44a300afc2e9b9ab9a4d387df71ca2d4cf5c59157e8a29750b0663ee6920c1ee72ebced7d72d61a211ad05f5c70bbc349964e8b3b00c1"' : 'data-target="#xs-injectables-links-module-UsersModule-629b71c10f5191a70ce44a300afc2e9b9ab9a4d387df71ca2d4cf5c59157e8a29750b0663ee6920c1ee72ebced7d72d61a211ad05f5c70bbc349964e8b3b00c1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-629b71c10f5191a70ce44a300afc2e9b9ab9a4d387df71ca2d4cf5c59157e8a29750b0663ee6920c1ee72ebced7d72d61a211ad05f5c70bbc349964e8b3b00c1"' :
                                        'id="xs-injectables-links-module-UsersModule-629b71c10f5191a70ce44a300afc2e9b9ab9a4d387df71ca2d4cf5c59157e8a29750b0663ee6920c1ee72ebced7d72d61a211ad05f5c70bbc349964e8b3b00c1"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Author.html" data-type="entity-link" >Author</a>
                            </li>
                            <li class="link">
                                <a href="classes/Comment.html" data-type="entity-link" >Comment</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentDto.html" data-type="entity-link" >CreateCommentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTweetDto.html" data-type="entity-link" >CreateTweetDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tweet.html" data-type="entity-link" >Tweet</a>
                            </li>
                            <li class="link">
                                <a href="classes/TweetResponseDto.html" data-type="entity-link" >TweetResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTweetDto.html" data-type="entity-link" >UpdateTweetDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});