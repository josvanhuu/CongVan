using System.Web;
using System.Web.Optimization;

namespace CongVan
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/header/js").Include(
                      "~/assets/js/ace-extra.min.js"
                      ));

            bundles.Add(new ScriptBundle("~/footer/js").Include(
                      "~/scripts/jquery-3.1.0.js",
                      "~/assets/js/ace-elements.min.js",
                      "~/assets/js/ace.min.js"
                      ));

            bundles.Add(new ScriptBundle("~/datetime/js").Include(
                "~/assets/js/bootstrap-datepicker.min.js",
                "~/assets/js/moment.min.js",
                "~/assets/js/daterangepicker.min.js",
                "~/assets/js/bootstrap-datetimepicker.min.js"
                ));

            bundles.Add(new StyleBundle("~/main/css").Include(
                 "~/assets/css/bootstrap.min.css",
                 "~/assets/font-awesome/4.5.0/css/font-awesome.min.css",
                 "~/assets/css/fonts.googleapis.com.css",
                 "~/assets/css/ace.min.css",
                 "~/assets/css/ace-part2.min.css",
                 "~/assets/css/ace-skins.min.css",
                 "~/assets/css/ace-rtl.min.css",
                 "~/Content/sweetalert/sweetalert.css",
                 "~/Content/toastr.min.css",
                 "~/assets/css/dropzone.css"
                 ));

            bundles.Add(new StyleBundle("~/infragistics/css").Include(
                 "~/Content/infragistics/infragistics.css",
                 "~/Content/infragistics/infragistics.theme.css"
                 ));

            bundles.Add(new ScriptBundle("~/bundles/require").Include(
                        "~/Scripts/require.js"));

            bundles.Add(new StyleBundle("~/documentsearch/css").Include(
                 "~/assets/css/jquery-ui.custom.min.css",
                 "~/assets/css/chosen.min.css",
                 "~/assets/css/bootstrap-datepicker3.min.css",
                 "~/assets/css/bootstrap-timepicker.min.css",
                 "~/assets/css/daterangepicker.min.css",
                 "~/assets/css/bootstrap-datetimepicker.min.css",
                 "~/assets/css/bootstrap-colorpicker.min.css"
                 ));

        }
    }
}
