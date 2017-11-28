define('app',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './services/messages'], function (exports, _aureliaFramework, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function App(au, ea) {
      var _this = this;

      _classCallCheck(this, App);

      ea.subscribe(_messages.LoginStatus, function (msg) {
        if (msg.status.success === true) {
          au.setRoot('home').then(function () {
            _this.router.navigateToRoute('tweet');
          });
        } else {
          au.setRoot('app').then(function () {
            _this.router.navigateToRoute('login');
          });
        }
      });
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'login'], name: 'login', moduleId: 'viewmodels/login/login', nav: true, title: 'Login' }, { route: 'signup', name: 'signup', moduleId: 'viewmodels/signup/signup', nav: true, title: 'Signup' }]);
      this.router = router;
    };

    return App;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('home',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia), _dec(_class = function () {
    function Home(au) {
      _classCallCheck(this, Home);

      this.aurelia = au;
    }

    Home.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'home'], name: 'tweet', moduleId: 'viewmodels/tweet/tweet', nav: true, title: 'Tweet' }, { route: 'timeline', name: 'timeline', moduleId: 'viewmodels/timeline/timeline', nav: true, title: 'Timeline' }, { route: 'friends', name: 'friends', moduleId: 'viewmodels/friends/friends', nav: true, title: 'Friends' }, { route: 'stats', name: 'stats', moduleId: 'viewmodels/stats/stats', nav: true, title: 'Stats' }, { route: 'dashboard', name: 'dashboard', moduleId: 'viewmodels/dashboard/dashboard', nav: true, title: 'Dashboard' }, { route: 'logout', name: 'logout', moduleId: 'viewmodels/logout/logout', nav: true, title: 'Logout' }]);
      this.router = router;
    };

    return Home;
  }()) || _class);
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/fixtures',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Fixtures = function Fixtures() {
    _classCallCheck(this, Fixtures);

    this.users = {
      'homer@simpson.com': {
        firstName: 'Homer',
        lastName: 'Simpson',
        email: 'homer@simpson.com',
        password: 'secret'
      },
      'marge@simpson.com': {
        firstName: 'Marge',
        lastName: 'Simpson',
        email: 'marge@simpson.com',
        password: 'secret'
      }
    };
    this.tweets = [];
  };

  exports.default = Fixtures;
});
define('services/messages',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var PostsUpdate = exports.PostsUpdate = function PostsUpdate(posts) {
    _classCallCheck(this, PostsUpdate);

    this.posts = posts;
  };

  var LoginStatus = exports.LoginStatus = function LoginStatus(status) {
    _classCallCheck(this, LoginStatus);

    this.status = status;
  };
});
define('services/tweet-service',['exports', 'aurelia-framework', './fixtures', './messages', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _fixtures, _messages, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _fixtures2 = _interopRequireDefault(_fixtures);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var TweetService = (_dec = (0, _aureliaFramework.inject)(_fixtures2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function TweetService(data, ea) {
      _classCallCheck(this, TweetService);

      this.tweets = [];
      this.users = [];
      this.posts = 0;
      this.loggedInUser = [];

      this.tweets = data.tweets;
      this.users = data.users;
      this.ea = ea;
    }

    TweetService.prototype.register = function register(firstName, lastName, email, password) {
      var newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };
      this.users[email] = newUser;
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
    };

    TweetService.prototype.login = function login(email, password) {
      var status = {
        success: false,
        message: ''
      };

      if (this.users[email]) {
        if (this.users[email].password === password) {
          status.success = true;
          status.message = 'logged in';
          this.loggedInUser = this.users[email];
        } else {
          status.message = 'Incorrect password';
        }
      } else {
        status.message = 'Unknown user';
      }
      this.ea.publish(new _messages.LoginStatus(status));
    };

    TweetService.prototype.logout = function logout() {
      var status = {
        success: false,
        message: ''
      };
      this.ea.publish(new _messages.LoginStatus(new _messages.LoginStatus(status)));
    };

    TweetService.prototype.sendTweet = function sendTweet(tweeter, text) {
      if (tweeter && tweeter !== null && text && text !== null) {
        var tweet = {
          tweeter: tweeter,
          text: text
        };
        this.tweets.push(tweet);
        this.posts = parseInt(this.tweets.length, 10);
        this.ea.publish(new _messages.PostsUpdate(this.posts));
        console.log(tweeter.firstName + ' tweeted: ' + text);
        console.log('Total tweets: ' + this.tweets.length);
      } else {
        console.log('Message cannot be empty! Must supply Tweeters name');
        console.log('Total tweets: ' + this.tweets.length);
      }
    };

    TweetService.prototype.addFriend = function addFriend(selectedFriend) {
      var friend = {
        firstName: selectedFriend.firstName,
        lastName: selectedFriend.lastName
      };
      console.log('Following: ' + friend.firstName + ' ' + friend.lastName);
    };

    return TweetService;
  }()) || _class);
  exports.default = TweetService;
});
define('viewmodels/dashboard/dashboard',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Dashboard = exports.Dashboard = function Dashboard() {
    _classCallCheck(this, Dashboard);
  };
});
define('viewmodels/friends/friends',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Friend = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Friend = exports.Friend = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function Friend(ts) {
    _classCallCheck(this, Friend);

    this.tweets = [];

    this.tweetService = ts;
    this.tweets = ts.tweets;
    var membersTweet = [];

    this.tweets.forEach(function (tweet) {
      if (membersTweet.indexOf(tweet) === -1) {
        membersTweet.push(tweet);
      }
      return membersTweet;
    });
  }) || _class);
});
define('viewmodels/login/login',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Login = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Login(ts) {
      _classCallCheck(this, Login);

      this.tweetService = ts;
      this.prompt = '';
    }

    Login.prototype.login = function login(e) {
      console.log('Trying to log in ' + this.email);
      this.tweetService.login(this.email, this.password);
    };

    return Login;
  }()) || _class);
});
define('viewmodels/logout/logout',['exports', '../../services/tweet-service', 'aurelia-framework'], function (exports, _tweetService, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Logout = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Logout = exports.Logout = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Logout(tweetService) {
      _classCallCheck(this, Logout);

      this.tweetService = tweetService;
    }

    Logout.prototype.logout = function logout() {
      console.log('logging out');
      this.tweetService.logout();
    };

    return Logout;
  }()) || _class);
});
define('viewmodels/signup/signup',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Signup = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Signup = exports.Signup = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Signup(ts) {
      _classCallCheck(this, Signup);

      this.firstName = 'Marge';
      this.lastName = 'Simpson';
      this.email = 'marge@simpson.com';
      this.password = 'secret';

      this.tweetService = ts;
    }

    Signup.prototype.register = function register(e) {
      this.registered = true;
      this.tweetService.register(this.firstName, this.lastName, this.email, this.password);
      this.tweetService.login(this.email, this.password);
    };

    return Signup;
  }()) || _class);
});
define('viewmodels/stats/stats',['exports', 'aurelia-framework', '../../services/messages', 'aurelia-event-aggregator', '../../services/tweet-service'], function (exports, _aureliaFramework, _messages, _aureliaEventAggregator, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Stats = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Stats = exports.Stats = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _tweetService2.default), _dec(_class = function () {
    function Stats(ea, ts) {
      var _this = this;

      _classCallCheck(this, Stats);

      this.posts = 0;

      this.ts = ts;
      ea.subscribe(_messages.PostsUpdate, function (msg) {
        _this.posts = msg.posts;
      });
    }

    Stats.prototype.attached = function attached() {
      this.posts = this.ts.posts;
      $('#jiggle').transition('jiggle', '1000ms');
    };

    return Stats;
  }()) || _class);
});
define('viewmodels/timeline/timeline',['exports', 'aurelia-framework', '../../services/tweet-service', 'jquery'], function (exports, _aureliaFramework, _tweetService, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Timeline = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Timeline = exports.Timeline = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Timeline(ts) {
      _classCallCheck(this, Timeline);

      this.tweets = [];

      this.tweetService = ts;
      this.tweets = ts.tweets;
    }

    Timeline.prototype.attached = function attached() {
      (0, _jquery2.default)('#tada').transition('tada', '1200ms');
    };

    return Timeline;
  }()) || _class);
});
define('viewmodels/tweet/tweet',['exports', 'aurelia-framework', '../../services/tweet-service', 'jquery'], function (exports, _aureliaFramework, _tweetService, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Tweet = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Tweet = exports.Tweet = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Tweet(ts) {
      _classCallCheck(this, Tweet);

      this.text = '';
      this.tweeter = [];

      this.tweetService = ts;
      this.tweeter = ts.loggedInUser;
    }

    Tweet.prototype.createTweet = function createTweet() {
      this.tweetService.sendTweet(this.tweeter, this.text);
      this.text = '';
    };

    Tweet.prototype.attached = function attached() {
      (0, _jquery2.default)('#flip').transition('horizontal flip', '500ms').transition('horizontal flip');
    };

    return Tweet;
  }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"nav-bar.html\"></require><div class=\"ui container page-host\"><nav-bar router.bind=\"router\"></nav-bar><router-view></router-view></div></template>"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template><require from=\"nav-bar.html\"></require><div class=\"ui container page-host\"><nav-bar router.bind=\"router\"></nav-bar><router-view></router-view></div></template>"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\"><nav class=\"ui menu\"><header class=\"header item\">MyTweet</header><div class=\"right menu\"><div repeat.for=\"row of router.navigation\"><a class=\"${row.isActive ? 'active' : ''} item\" href.bind=\"row.href\">${row.title}</a></div></div></nav></template>"; });
define('text!viewmodels/dashboard/dashboard.html', ['module'], function(module) { module.exports = "<template><div></div><compose view-model=\"../timeline/timeline\"></compose><div class=\"row\"><div class=\"column\"><compose view-model=\"../tweet/tweet\"></compose><compose view-model=\"../stats/stats\"></compose><compose view-model=\"../friends/friends\"></compose></div><div class=\"column\"></div></div></template>"; });
define('text!viewmodels/friends/friends.html', ['module'], function(module) { module.exports = "<template><div></div><section class=\"ui inverted segment\"><h2 class=\"ui red center aligned header\">MyTweet Friendships</h2><table class=\"ui celled table raised segment\"><thead><tr><th>Friends Name <span style=\"float:right\"><i class=\"user icon\"></i></span></th><th>Friends Email <span style=\"float:right\"><i class=\"mail icon\"></i></span></th></tr></thead><tbody><tr repeat.for=\"tweet of membersTweet\"><td> ${tweet.tweeter.firstName}</td><td> ${tweet.tweeter.email}</td></tr></tbody></table></section></template>"; });
define('text!viewmodels/login/login.html', ['module'], function(module) { module.exports = "<template><div></div><section class=\"ui inverted segment\"><section class=\"ui raised segment\"><div class=\"ui three column grid basic middle aligned segment\"><div class=\"column\"><img src=\"assets/images/login.png\" class=\"ui medium image\"></div><div class=\"ui column fluid form\"><form submit.delegate=\"login($event)\" class=\"ui form column raised segment\"><h2 class=\"ui red center aligned header\">Login In</h2><div class=\"field\"><label>Email</label><div class=\"ui icon input\"><input placeholder=\"Email\" value.bind=\"email\"> <i class=\"mail icon\"></i></div><div class=\"field\"><label>Password</label><div class=\"ui icon input\"><input type=\"password\" value.bind=\"password\"> <i class=\"lock icon\"></i></div></div><button class=\"ui green submit button\"><i class=\"sign in icon\"></i>Login</button><h5>${prompt}</h5></div></form></div><div class=\"column\"><img src=\"/assets/images/login2.png\" class=\"ui medium image\"></div></div></section></section></template>"; });
define('text!viewmodels/signup/signup.html', ['module'], function(module) { module.exports = "<template><div></div><section class=\"ui inverted segment\"><section class=\"ui raised segment\"><div class=\"ui three column grid basic middle aligned segment\"><div class=\"column\"><img src=\"assets/images/signup.png\" class=\"ui medium image\"></div><div class=\"ui center aligned column\"><h2 class=\"ui center aligned header\">Welcome to MyTweet</h2><p>Find out what’s happening in the world right now .<br>Whether you’re interested in music, sports, politics, news, celebrities, or everyday moments.<br>MyTweet has got it all!!</p><p>Connect with friends or any other people of interest<br>Just Register your new details in just a few clicks.<br>If you are a returning member - Welcome back...</p></div><div class=\"ui column fluid form\"><form submit.delegate=\"register($event)\" class=\"ui form column raised segment\"><h2 class=\"ui red center aligned header\">Register Now!!</h2><div class=\"two fields\"><div class=\"field\"><label>First Name</label><div class=\"ui icon input\"><input placeholder=\"First Name\" type=\"text\" value.bind=\"firstName\"> <i class=\"user icon\"></i></div></div><div class=\"field\"><label>Last Name</label><div class=\"ui icon input\"><input placeholder=\"Last Name\" type=\"text\" value.bind=\"lastName\"> <i class=\"user icon\"></i></div></div></div><div class=\"field\"><label>Email</label><div class=\"ui icon input\"><input placeholder=\"Email\" type=\"text\" value.bind=\"email\"> <i class=\"mail icon\"></i></div></div><div class=\"field\"><label>Password</label><div class=\"ui icon input\"><input type=\"password\" value.bind=\"password\"> <i class=\"lock icon\"></i></div></div><button class=\"ui green submit button\"><i class=\"add user icon\"></i>Sign up</button></form></div></div></section></section></template>"; });
define('text!viewmodels/logout/logout.html', ['module'], function(module) { module.exports = "<template><div></div><section class=\"ui inverted segment\"><form submit.delegate=\"logout($event)\" class=\"ui center aligned form column raised segment\"><h3 class=\"ui header\">Are you sure you want to log out?</h3><button class=\"ui red submit button\"><i class=\"sign out icon\"></i>Logout</button></form></section></template>"; });
define('text!viewmodels/stats/stats.html', ['module'], function(module) { module.exports = "<template><div></div><section class=\"ui center aligned inverted segment\"><section class=\"ui segment\"><section class=\"ui centered raised statistic segment\" id=\"jiggle\"><div class=\"value\"><i class=\"twitter icon\"></i>${posts}</div><div class=\"label\">Posts</div></section></section></section></template>"; });
define('text!viewmodels/tweet/tweet.html', ['module'], function(module) { module.exports = "<template><section class=\"ui two column grid basic segment\"><section class=\"ui inverted segment\" id=\"flip\"><form submit.trigger=\"createTweet()\" class=\"ui form column raised center aligned segment\"><h2 class=\"ui red center aligned header\">Extra, Extra Tweet All About It!!</h2><div class=\"field\"><textarea placeholder=\"What's on your mind?\" maxlength=\"140\" value.bind=\"text\"></textarea></div><button class=\"ui green submit button\"><i class=\"yellow twitter icon\"></i>Post</button></form></section></section></template>"; });
define('text!viewmodels/timeline/timeline.html', ['module'], function(module) { module.exports = "<template><div></div><section class=\"ui inverted segment\"><section class=\"ui raised segment\"><div class=\"ui grid\"><aside class=\"six wide column\"><img src=\"assets/images/global.png\" class=\"ui medium centered image\" id=\"tada\"></aside><div class=\"ten wide column\"><table class=\"ui selectable table raised segment\"><h2 class=\"ui red center aligned header\">Global Timeline Tweets</h2><thead><tr><th>Tweeters</th><th>Tweets</th></tr></thead><tbody><tr repeat.for=\"tweet of tweets\"><td> ${tweet.tweeter.firstName} ${tweet.tweeter.lastName}</td><td> ${tweet.text}</td></tr></tbody></table></div></div></section></section></template>"; });
//# sourceMappingURL=app-bundle.js.map