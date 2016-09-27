//using Resource;
using Resource;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace CongVan.Areas.Admin.Models
{
    public class DepartmentsModel
    {
        public string EID { get; set; }
        [Required(ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_Required")]
        public string Code { get; set; }
        [Required(ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_Required")]
        public string Name { get; set; }
        public string Address { get; set; }
        [Required(ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_Required")]
        public string Email { get; set; }
        [Required(ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_Required")]
        public string Phone { get; set; }
        [Required(ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_Required")]
        public string Description { get; set; }
    }
}
