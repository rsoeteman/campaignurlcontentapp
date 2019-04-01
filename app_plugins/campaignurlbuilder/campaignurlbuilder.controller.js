angular.module("umbraco")
    .controller("seo.CampaignUrlBuilderApp", function ($scope, editorState, $location, notificationsService) {

        var vm = this;
        vm.editorInfo = editorState.current;

        vm.campaignOptions = [
            { name: "Campaign Source", description: "Use this to identify a search engine, newsletter name, or other source.", queryparameter: "utm_source", value: "",placeholder:"Example: Facebook" },
            { name: "Campaign Medium", description: "Use this to identify a medium such as email or cost-per- click.", queryparameter: "utm_medium", value: "",placeholder:"Example: email" },
            { name: "Campaign Name", description: "Use this to identify a specific product promotion or strategic campaign.", queryparameter: "utm_campaign", value: "",placeholder:"Example: spring_sale" },
            { name: "Campaign Term", description: "Use this to note the keywords for this paid ad.", queryparameter: "utm_term", value: "",placeholder:"Example: running_shoes" },
            { name: "Campaign Content", description: "Used for A/B testing and content-targeted ads. Use this to differentiate ads or links that point to the same URL.", queryparameter: "utm_content", value: "",placeholder:"Example: ab_link" }
        ];

        vm.buildUrlQueryString = function(path) {
            var qs = '';
            var qp= '?';
            angular.forEach(vm.campaignOptions, function(item){
                if (item.value !== "") {
                    qs = qs + qp+ item.queryparameter + "=" + item.value;
                    qp = "&";
                }
                
            });
            return $location.protocol() + "://"+ $location.host() + path + qs;
        }

        vm.copy = function(path) {
          var urlToCopy = vm.buildUrlQueryString(path);
            var el = document.createElement("textarea");
            el.value = urlToCopy;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);

            notificationsService.success("Url","The url is copied to the clipboard" );
        }
    });