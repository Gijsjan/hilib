[33mcommit cb6546946d74d7aee3facf0df9c3495be8849d5b[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Jan 17 18:18:00 2014 +0100

    Refactor setting the top position

[33mcommit 2c8388c9eb08bd0312149e2f9940f0b2a0e5f0cc[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Jan 17 18:17:33 2014 +0100

    Return null if no token is set, instead of false

[33mcommit 94f78068fbf078cfc4b17a5ab9692fa90fbf5579[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Jan 17 18:17:01 2014 +0100

    Only add Authorization header when token is present

[33mcommit 20fd6497b39acb278efce6e4639b635134328549[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Mon Jan 13 14:16:41 2014 +0100

    Add options.cache

[33mcommit 08899e28860e33d52995ae118731d449af392db7[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Jan 9 18:31:16 2014 +0100

    Add new viewManager

[33mcommit e8cbd32ab64db8da96e0086135a0c5b3aa771e3f[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Jan 9 14:08:54 2014 +0100

    Remove viewManager

[33mcommit ee212f7a7d186e3a6c267583e3787a0d578f00c0[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Wed Dec 18 17:10:27 2013 +0100

    Fix bug where options.start would not lead to correct pagenumber

[33mcommit 2b3601d1996834378ce0397d425d686cc3b0004e[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Wed Dec 18 15:09:51 2013 +0100

    Add wordwrap option and activate/deactivate save button

[33mcommit cc9270e1d53deaa6f59ecfe4d5fce237ec37b22a[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Wed Dec 18 15:06:39 2013 +0100

    Add tokenType
    
    The default tokenType is SimpleAuth, but for eLaborate we had to add a
    Federated. We can imagine other types are needed, so we added a
    tokenType.

[33mcommit e4a704717fa8656846272ca56b01a6ee8947da6a[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Wed Dec 18 15:06:20 2013 +0100

    Use hilib/token instead of @token

[33mcommit f77eabf7cd2d183a8a2e6394c47d70245b702a16[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Mon Dec 16 15:55:36 2013 +0100

    Fix bug where value in loop could be null

[33mcommit 510633da2b470672a974d73bd804ff014a4f92dd[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Mon Dec 16 14:03:46 2013 +0100

    Code clean up

[33mcommit 0f0fa84c0ff3192268e4b42ab187c7b81fa56d6e[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Dec 12 17:27:32 2013 +0100

    Adjust insertAfter to new DOM setup

[33mcommit ce3a9e8a8d8d48963657938dedaf87ad4b996836[m
Merge: e9b23bb 39f23f9
Author: Gijsjan <agijsbro@gmail.com>
Date:   Mon Dec 9 17:11:14 2013 +0100

    Merge branch 'master' of https://github.com/HuygensING/hilib

[33mcommit e9b23bb76656ab361a092dea22b5c365aca1049a[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Mon Dec 9 17:10:24 2013 +0100

    Let currentPage be dependant on @options.start

[33mcommit 39f23f975d91938ada78911e0baf27a4d20f22c0[m
Author: Gijs <agijsbro@gmail.com>
Date:   Mon Dec 9 09:00:08 2013 +0100

    Add check before setting focus to supertinyeditor

[33mcommit 522c84cf7428105a5edbc3d5ae9dd17fefbee78a[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Dec 5 16:32:22 2013 +0100

    Update

[33mcommit fff8cd8bbf1ef2adbfe1c4333e0381e94814a3f7[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Dec 3 17:25:52 2013 +0100

    Add views/pagination

[33mcommit 51b32719fa9a54415524e01936a4a727bfc02b9d[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Dec 3 10:24:23 2013 +0100

    Update Travis URL after move Gijsjan -> HuygensING

[33mcommit 821866991501773fd7c0e4dcfd6052b047782c34[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Dec 3 10:15:45 2013 +0100

    Update

[33mcommit 7d1e59ae8051ab9deaef3428beecf388a10ff068[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Nov 28 17:34:35 2013 +0100

    Handle documentFragment when showing html

[33mcommit 16e7c71285f1ec22316b57c47f0d9bbb88520f2e[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Nov 26 16:56:44 2013 +0100

    Fix bugs when using new hilib/views/form/* with multiform

[33mcommit e4a07315da056b118a5cc56fb77ea29a854a4d4b[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Nov 26 11:26:49 2013 +0100

    Update version

[33mcommit 06e1451d8c5d77f35ba705a0a44995b1625038da[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Nov 26 11:16:39 2013 +0100

    Clean up stylus/coffee/jade

[33mcommit 5e1d4b481286134076432ba9ebc98f8fb29c49fd[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Mon Nov 25 18:10:39 2013 +0100

    Bugfixes on views/form
    
    Remove .orig files

[33mcommit 9388894d9b8cf5e569c1184c1b1e3993d4a8afec[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Mon Nov 25 13:12:11 2013 +0100

    Fix bug where modal didnt trigger close

[33mcommit 7ecf7929a3df627811824418b40e423596c9a9b3[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Mon Nov 25 12:03:16 2013 +0100

    Add show/hide

[33mcommit 0a22ad6b6a9ae6d36957482abf6aa516d7205400[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Mon Nov 25 12:02:45 2013 +0100

    Cache body lookup

[33mcommit 5f87607a06c339bcd63b7cb5c0a05673e01bc2b5[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Mon Nov 25 11:31:16 2013 +0100

    Remove jQuery dependency

[33mcommit ad146b4388f72858a7d81ec748cbe00fdbbe59f6[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Mon Nov 25 11:30:13 2013 +0100

    Add querySelect shortcut and .html()

[33mcommit 9a0c20c63f92dbabe1bc61073637a3f17e15a423[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Mon Nov 25 11:29:39 2013 +0100

    Remove classList lib

[33mcommit 909615aceb5eb6f83a337ae38eb0612525237d19[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Mon Nov 25 11:28:11 2013 +0100

    Restore accidentally removed jade tpl

[33mcommit 8bcc106f380cc916cb4b71143c1c7ea6cd331d9f[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 22 18:17:00 2013 +0100

    Add titleClass option and display none on empty elements

[33mcommit 605cc2d987abcf88ef5662fc1265a4eb63ea2f07[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 22 15:35:10 2013 +0100

    Add loader to submit buttons
    
    merge me

[33mcommit 0f30432b24881a73553c6fcd3a6eed4aa90e21af[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 22 15:34:57 2013 +0100

    Dropdown should listen to external changes

[33mcommit 9bf7e7fe7d83e8de1191f44869286bd4dfe9776b[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 22 15:33:12 2013 +0100

    Remove clone from collection to keep reference
    
    merge me

[33mcommit c7c17de99b44233cce6dd099f2edf0869a92e4a3[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 22 14:59:43 2013 +0100

    Remove .orig files

[33mcommit 8df965c24dc77281889dd164af0d9c9acebc6546[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 22 14:57:59 2013 +0100

    Fix typo

[33mcommit 2a8ca046a5952e46f955db31f2b2686827179cce[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 22 14:57:18 2013 +0100

    Add loader

[33mcommit 0622bb0455749b02db82b1f72e174bafc0969f05[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 22 14:56:02 2013 +0100

    Add main css for hilib

[33mcommit 204c87e1eefe4899adcfcdb8df67f914de929455[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 22 13:44:58 2013 +0100

    Add classList funcs to functions/DOM

[33mcommit 18a4e0e464a4033d519ffc7db989a07695f23ad4[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 22 13:17:59 2013 +0100

    Add ~ and orig files

[33mcommit 671db8a5e08423ffc25bb0f31054108e3c119cec[m
Author: Gijs <agijsbro@gmail.com>
Date:   Mon Nov 18 23:44:20 2013 +0100

    Empty compiled
    
    update
    
    update
    
    update

[33mcommit 74a9a94a07a6fafe0208c582860e3b95425b04bb[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Nov 14 17:48:43 2013 +0100

    Add highlightUntil to functions/dom
    
    Add example usage to highlightUntil

[33mcommit 94d69a624f253cb4921ea4efdf3700272b652cbb[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 8 11:31:50 2013 +0100

    Make project ready for Travis CI
    
    Add .travis.yml
    
    travis 2
    
    travis3
    
    travis4
    
    travis5
    
    travis6
    
    travis7
    
    travis8
    
    travis8
    
    travis9
    
    travis10
    
    Add Travis CI support
    
    Make project ready for Travis CI
    
    Add .travis.yml
    
    travis 2
    
    travis3
    
    travis4
    
    travis5
    
    travis6
    
    travis7
    
    travis8
    
    travis8
    
    travis9
    
    travis10
    
    travis11
    
    Changed jade templates to preprender
    
    Forgot README
    
    Still Travis
    
    Still Travis 2
    
    update
    
    messy commit

[33mcommit bd67160dc6a91f496b818eb91a4f18c2732a56ce[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Oct 31 15:27:50 2013 +0100

    Add caching to view manager
    
    Every view has a flag options.cache which is true by default. With
    caching, the view is stored in a hash with a hashCode as key and the
    view as value.
    
    empty commit
    
    update

[33mcommit c1ce8f78bc35c1da8472d60e93df5787d00f65bf[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Oct 29 11:24:22 2013 +0100

    readme
    
    readme
    
    readme

[33mcommit 743b10dbd13ae9fb156ac95209bfb75dc11df5ec[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 22 12:51:53 2013 +0100

    update

[33mcommit 5353d1cf93cbfe24e2cce9f3de7c095d75723656[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Nov 21 17:41:30 2013 +0100

    update

[33mcommit f131ef76e9bbf43aabf5a2a07ea78157b00dc6df[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Nov 21 14:41:36 2013 +0100

    update

[33mcommit d9eae8f5c9f686e7b3c7ddf5c13974ef5be4bb96[m
Merge: 482fc9a 058a334
Author: Gijsjan <agijsbro@gmail.com>
Date:   Wed Nov 20 17:12:36 2013 +0100

    merge

[33mcommit 482fc9ab2208e0dfda32a2b6cfe2b0571c5c2d89[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Wed Nov 20 17:11:47 2013 +0100

    Add gitignore

[33mcommit 85b1a41feba462936119aed5e9bac958b91387f0[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Wed Nov 20 17:11:00 2013 +0100

    update

[33mcommit ab9981652a352295fa2680bc212306a0bbd85025[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Wed Nov 20 17:10:23 2013 +0100

    update

[33mcommit 058a3341b23a4945a9352abb4fe58a8543488ca1[m
Author: Gijs <agijsbro@gmail.com>
Date:   Mon Nov 18 23:44:20 2013 +0100

    Empty compiled

[33mcommit e1e6e729c235f6e6858845b99b6abdc75d6a75d6[m
Author: Gijs <agijsbro@gmail.com>
Date:   Mon Nov 18 23:43:19 2013 +0100

    Add concurrent, newer and register-grunt-tasks

[33mcommit 550a49ba71b8240bf440131bb058e1963d7173bc[m
Merge: 2de69c0 ae9e44b
Author: Gijs <agijsbro@gmail.com>
Date:   Mon Nov 18 14:26:49 2013 +0100

    Merge branch 'master' of https://github.com/Gijsjan/hilib

[33mcommit ae9e44b5142e6814594430492eabb81eea8bdda0[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 15 17:32:36 2013 +0100

    Add example usage to highlightUntil

[33mcommit 7e5fe548f7618948c53c9113ac2d839e36b54198[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 15 14:12:57 2013 +0100

    Add highlightUntil to functions/dom

[33mcommit 849cfc7eb6014eb22d32df53661068a06e40fe8e[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Nov 14 17:48:43 2013 +0100

    Work on new highlighter part 1

[33mcommit e37fd582c17ae258383ba3fc5e458369edba3a9a[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Nov 14 10:42:40 2013 +0100

    Simplify async by removing two methods

[33mcommit 2bc23a2b373f060bc1457d87fb39a3476da3bbc7[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Wed Nov 13 18:39:23 2013 +0100

    Add boundingbox to dom

[33mcommit 6e370623a1fa3fa0eada4e5a1cbf7faf77b6bd31[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Wed Nov 13 18:00:41 2013 +0100

    Update version to 0.0.2

[33mcommit 9b3794a0daef332d59ffa64cb5dcf686c73316bc[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Wed Nov 13 17:09:29 2013 +0100

    Fix caching of managers/view
    
    The clearChache method did not call @clear. @clear should not remove
    persistent views. The show method is still ambiguous, it is mostly used
    to show the main view which renders subviews, but it can also be used to
    render (persistent) subviews. This should be fixed.

[33mcommit 2aeffdb787d21ec6b2084625769800e629c6c221[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Wed Nov 13 17:01:58 2013 +0100

    Change this. to @ and cb to done

[33mcommit 5be3f7805afc9a6dd6ae6204dbcf9686498f4280[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Wed Nov 13 13:35:18 2013 +0100

    messy commit

[33mcommit cb6b73addb12631e224d312f091b26b4746dfb46[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Nov 12 18:29:09 2013 +0100

    update

[33mcommit 6b2a5c913314e1535a3b9d805016ce377739e233[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 8 18:19:25 2013 +0100

    Still Travis 2

[33mcommit 5b2975ba67693f70cf84a0cdfee8908af05cb49b[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 8 18:18:42 2013 +0100

    Still Travis

[33mcommit 7b11ac0034116bb85d526a386f2e2ca44e5319c4[m
Merge: 33bea14 2447837
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 8 17:16:43 2013 +0100

    Merge from newjade branch

[33mcommit 2447837159282060f7ba4b19751ba7a62149e3d9[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 8 11:31:50 2013 +0100

    Make project ready for Travis CI
    
    Add .travis.yml
    
    travis 2
    
    travis3
    
    travis4
    
    travis5
    
    travis6
    
    travis7
    
    travis8
    
    travis8
    
    travis9
    
    travis10
    
    travis11
    
    Changed jade templates to preprender
    
    Forgot README

[33mcommit 8736eee4f9e1ab34b4e5a27914dd4919a3e62313[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Nov 7 18:14:59 2013 +0100

    update

[33mcommit 6fb8b44c1a2d6cc447cfc7438287cd3bb1700ad9[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Oct 31 15:27:50 2013 +0100

    Add caching to view manager
    
    Every view has a flag options.cache which is true by default. With
    caching, the view is stored in a hash with a hashCode as key and the
    view as value.
    
    empty commit

[33mcommit 33bea148045810c0bd09dc62cbab6c748c0e4939[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 8 13:48:33 2013 +0100

    Remove console.log

[33mcommit 285b551b813080bef48a836f2a23bfd8034c5b43[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 8 13:42:50 2013 +0100

    travis10

[33mcommit f6be1c84b011baa88e5c4d1f9acb7fd75120c6e9[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 8 12:57:33 2013 +0100

    travis9

[33mcommit 82397e0264859f3d8991688673832cfe8164979c[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 8 12:47:36 2013 +0100

    travis8

[33mcommit a5aa28d9fa57ecd46eb31b824187ccf389072491[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 8 12:42:59 2013 +0100

    travis8

[33mcommit ba9afa7e0c09b68cca00ac142fb568c6d0541c07[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 8 12:20:31 2013 +0100

    travis7

[33mcommit 25b025db2600fe9fafef5a054410988efeefd0e6[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 8 11:59:50 2013 +0100

    travis6

[33mcommit 22e17da5e35aa1ab60972c33c21d07d16930911c[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 8 11:58:20 2013 +0100

    travis5

[33mcommit 0d98772529e730f079426dcc423b077f4ab2d7f9[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 8 11:50:53 2013 +0100

    travis4

[33mcommit ed851b69b7361e345595fd895382cb1a015775de[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 8 11:46:06 2013 +0100

    travis3

[33mcommit d6453af5ac7530ba008133a88ae4976b8975c640[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 8 11:40:41 2013 +0100

    travis 2

[33mcommit b5ab7a217e59af9969765eb2a2d34885c64ef939[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 8 11:36:46 2013 +0100

    Add .travis.yml

[33mcommit fdff8e086eb7995262a5531c653435b3d853518c[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Nov 8 11:31:50 2013 +0100

    Make project ready for Travis CI

[33mcommit 9e246eb39dcb4d369399749afd528fd22116851e[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Nov 7 18:14:59 2013 +0100

    update

[33mcommit 487728997591e7f3b7706ed069bad3f1e92226cc[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Oct 31 17:44:04 2013 +0100

    empty commit

[33mcommit 4ad591089a21fe4e66c41da839b566254be81b4f[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Oct 31 15:27:50 2013 +0100

    Add caching to view manager
    
    Every view has a flag options.cache which is true by default. With
    caching, the view is stored in a hash with a hashCode as key and the
    view as value.

[33mcommit 4cf410ba744ab786514e6900002ef8b4b3d914fa[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Oct 31 10:54:38 2013 +0100

    Add tests
    
    Hilib is a concatination of several libs (helpers, managers, mixins,
    views). Helpers, managers and mixins already had tests, but I did not add them
    to hilib yet. Tests for views have to be written.

[33mcommit bf70d78bc6676934349c1fa475b0cbdee91e0ca0[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Wed Oct 30 18:04:10 2013 +0100

    supertinyeditor: trigger scroll event on keyup

[33mcommit eae2adaf7178ccd5ca20cb48dc035ba7749a511c[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Wed Oct 30 13:40:21 2013 +0100

    form can now be used with string and function tpl

[33mcommit 2de69c0716945b15bb809785d4ce79ab901d51de[m
Merge: ca1bf47 160f7f3
Author: Gijs <agijsbro@gmail.com>
Date:   Wed Oct 30 00:18:27 2013 +0100

    Merge branch 'master' of https://github.com/Gijsjan/hilib

[33mcommit ca1bf4782a4be514ad1d4633323296b7fdcbef1d[m
Author: Gijs <agijsbro@gmail.com>
Date:   Wed Oct 30 00:18:01 2013 +0100

    added gitignore

[33mcommit 160f7f31e13977c6b2001ebe4b6f4903999bebc9[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Oct 29 16:38:45 2013 +0100

    empty commit

[33mcommit d7adc886c7b85e99200071e091d2fcba96284c43[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Oct 29 16:18:44 2013 +0100

    styled combolist like editablelist

[33mcommit bf87d8d0263ca90d14c8c71df35a471c823af07d[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Oct 29 13:34:25 2013 +0100

    modal title can now be empty (dont show title) and editablelist has gotten an option to confirm a remove from the list

[33mcommit 96c6e4a9615aa8e7e2c1753329fce3c350f810ef[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Oct 29 12:19:31 2013 +0100

    Added settings.placeholder to editablelist and combolist now return a "changed" object instead of only the revised IDs

[33mcommit 37613e51ac377f865bd92d4ead1ec958b6de3a8a[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Oct 29 11:29:48 2013 +0100

    bower.json

[33mcommit c685694dbab6dab455b9342028356f1073c3bfe0[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Oct 29 11:28:14 2013 +0100

    readme

[33mcommit 0685ae5b78b45327a9a1c2e3366baaf7167db4e4[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Oct 29 11:27:16 2013 +0100

    readme

[33mcommit ccb25595f4ab2396b8fbe52e75c12ce6f5f2851c[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Oct 29 11:24:22 2013 +0100

    readme

[33mcommit a20045b7bc89db8d58e2012451dd3e4ed594a47f[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Oct 29 10:47:14 2013 +0100

    added hasScrollBars to general and evenly spaced diacritics in supertinyeditor

[33mcommit 176c9baa10d579b4a9c9324b3b18f056bc4e5844[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Mon Oct 28 17:30:14 2013 +0100

    added diacritics menu

[33mcommit 92d71457483c9a76a1b5bd63ee8ccbdd771b086c[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Oct 25 15:06:47 2013 +0200

    added model.changedsincelastsave

[33mcommit 7b5728ae6b7c521014de75f54bc44532f3618662[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Oct 25 12:57:27 2013 +0200

    unimportant

[33mcommit afd1b2380335722db91ca58458393712b276b928[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Oct 24 17:43:48 2013 +0200

    update

[33mcommit c6041e581b2f0c4311c4932ce8028287c2f4f5f6[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Oct 22 17:45:46 2013 +0200

    update

[33mcommit 5e5166251560e8e5af049d3d096d70d57df0826d[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Oct 17 18:33:14 2013 +0200

    update

[33mcommit 896ba1489e27c98af5b5f445fc44e57a679030eb[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Wed Oct 16 09:34:45 2013 +0200

    added ajax.poll

[33mcommit 3f8039fc1bcc566a6e6f2fa58bc825b3bf433d49[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Oct 15 17:37:00 2013 +0200

    update

[33mcommit d1e66e1938f0040aab03c632c9bd0ea49b8e6388[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Mon Oct 14 13:04:48 2013 +0200

    update

[33mcommit 7ee23d5d11cd919a13e29e0cc51082a9c1e8c9d0[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Oct 11 15:03:56 2013 +0200

    update

[33mcommit d7a443c0f60ae1923f286a2d34f6e8a9fd69dd37[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Oct 10 17:01:49 2013 +0200

    added model.sync

[33mcommit 6090616dd36f5c0951028d3522596c90b75eea1c[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Oct 10 15:12:02 2013 +0200

    update

[33mcommit a0f6fe3e372f0ae07aa358a7a8de09593e7a7a17[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Oct 8 11:25:56 2013 +0200

    deletion

[33mcommit 04e01b69cbf97445835bd777b079618c836b0d3d[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Oct 8 11:25:45 2013 +0200

    updated modal

[33mcommit bf78e0f5cb4c5a4e739c7a0f0d1083e44f04dd86[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Mon Oct 7 12:45:20 2013 +0200

    forget deletion (-A)

[33mcommit 24547350ad67de651c9944c42a73cf38e5636e67[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Mon Oct 7 12:45:01 2013 +0200

    changed longpress from module to view

[33mcommit 5e54e9a78e9f1eaf4af9da8090e1b4c8c26f9d2d[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Mon Oct 7 12:28:09 2013 +0200

    fixed FF issues on longpress

[33mcommit e3906470508b690fe98acdc40ef1d6df7fcc7417[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Oct 4 17:16:49 2013 +0200

    fixed FF collapse for longpress and pulled longpress list out of iframe

[33mcommit d26388255464bac171c7c8dcbb549a8536c60685[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Oct 4 16:40:14 2013 +0200

    added diacritics (modules/longpress) to supertinyeditor

[33mcommit 8fe5025769915e0b9dd46bb1d9275d3fece9f181[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Oct 3 16:27:15 2013 +0200

    added images/ and compiled/

[33mcommit 43a1b56038ec0e46c6b391e80da25ca0b58c51c2[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Oct 3 11:51:47 2013 +0200

    Deleted .gitignore

[33mcommit 967a0e7dbf22489459278d8fc84989e4a2dcbcc0[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Oct 3 11:46:21 2013 +0200

    initial

[33mcommit 366ebc573673b2199340a1f3099ec0558ee06959[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Thu Sep 19 17:42:35 2013 +0200

    added saveHTMLToModel function

[33mcommit cc25c091d97df73ec63beb2963c562c5d8856451[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Wed Sep 18 18:42:36 2013 +0200

    update

[33mcommit 7d32eb9cf502a1782ab4137bf4865fb832fd0749[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Mon Sep 16 17:51:19 2013 +0200

    update

[33mcommit ced2c0f526e5218092625cc07cc774938c1ce94d[m
Author: media <media@media-OptiPlex-740-Enhanced.(none)>
Date:   Fri Sep 13 17:53:21 2013 +0200

    update

[33mcommit 6fdc45d1b64f315d33ab1cdf6cc423ba9fdc8ce1[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Fri Sep 13 16:56:06 2013 +0200

    update

[33mcommit b8461b032d9360a295906ebd5ba3d59c158e8d42[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Sep 10 17:45:44 2013 +0200

    removed old tests

[33mcommit c5d5fc5a28b8d6f19ac0bbb4365495b25255ad32[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Sep 10 17:44:43 2013 +0200

    initial

[33mcommit 62acb8b6fd575655abb482538e55799ea338e5b8[m
Author: Gijsjan <agijsbro@gmail.com>
Date:   Tue Sep 10 08:38:30 2013 -0700

    Initial commit
