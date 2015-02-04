'use strict';

// var User = require('./user.model');

/**
 * Get list
 */

exports.show = function (req, res) {
  res.status(200).json({
    "_id": {
        "$oid": "54d01abc00c2af0c00e6d2dd"
    },
    "name": "Richard VanBreemen",
    "provider": "github",
    "github": {
      "updated_at": "2015-02-01T23:12:59Z",
      "created_at": "2011-08-29T22:49:02Z",
      "following": 42,
      "followers": 36,
      "public_gists": 41,
      "public_repos": 24,
      "bio": null,
      "hireable": true,
      "email": "rvbsanjose@gmail.com",
      "location": "Milpitas, CA",
      "blog": "",
      "company": "",
      "name": "Richard VanBreemen",
      "site_admin": false,
      "type": "User",
      "received_events_url": "https://api.github.com/users/rvbsanjose/received_events",
      "events_url": "https://api.github.com/users/rvbsanjose/events{/privacy}",
      "repos_url": "https://api.github.com/users/rvbsanjose/repos",
      "organizations_url": "https://api.github.com/users/rvbsanjose/orgs",
      "subscriptions_url": "https://api.github.com/users/rvbsanjose/subscriptions",
      "starred_url": "https://api.github.com/users/rvbsanjose/starred{/owner}{/repo}",
      "gists_url": "https://api.github.com/users/rvbsanjose/gists{/gist_id}",
      "following_url": "https://api.github.com/users/rvbsanjose/following{/other_user}",
      "followers_url": "https://api.github.com/users/rvbsanjose/followers",
      "html_url": "https://github.com/rvbsanjose",
      "url": "https://api.github.com/users/rvbsanjose",
      "gravatar_id": "",
      "avatar_url": "https://avatars.githubusercontent.com/u/1013085?v=3",
      "id": 1013085,
      "login": "rvbsanjose"
    },
    "skills": [
        {
          "skillname": "Angular",
          "githublink": "https://github.com/rvbsanjose/selfeeds"
        },
        {
          "skillname": "Python",
          "githublink": "https://github.com/rvbsanjose/python"
        },
        {
          "skillname": "Lua",
          "githublink": "https://github.com/rvbsanjose/lua"
        },
        {
          "skillname": "PHP",
          "githublink": "https://github.com/rvbsanjose/php"
        },
        {
          "skillname": "Julia",
          "githublink": "https://github.com/rvbsanjose/julia"
        },
        {
          "skillname": "Backbone",
          "githublink": "https://github.com/rvbsanjose/500_Backbone"
        }
    ],
    "role": "user",
    "__v": 0,
    "languages": {
      "TypeScript": 16649,
      "Java": 25348,
      "PHP": 2274,
      "Lua": 272,
      "Python": 13165,
      "Julia": 808,
      "Makefile": 897,
      "Shell": 40957,
      "Dart": 31371,
      "Ruby": 192180,
      "CoffeeScript": 78727,
      "CSS": 442212,
      "JavaScript": 12742586
    },
    critter: {
      "dob": "2015-02-03",
      "name": "Mongolicious",
      "level": 109,
      "type": "Air",
      "food": {
        "current": 409,
        "needed": 217
      }
    }
  });
};
