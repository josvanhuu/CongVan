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

        //[Display(Name = "Admin_Salon_Index_Model_Name", ResourceType = typeof(AdminResources))]
        //[Required(ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_Required")]
        //[StringLength(200, ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_StringLength")]
        //public string Name { get; set; }

        //[Display(Name = "Admin_Salon_Index_Model_DeputyName", ResourceType = typeof(AdminResources))]
        //[StringLength(200, ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_StringLength")]
        //public string DeputyName { get; set; }

        //[Display(Name = "Admin_Salon_Index_Model_Email", ResourceType = typeof(AdminResources))]
        //[StringLength(100, ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_StringLength")]
        //[EmailAddress(ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_Email")]
        //public string Email { get; set; }

        //[Display(Name = "Admin_Salon_Index_Model_Phone", ResourceType = typeof(AdminResources))]
        //[Required(ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_Required")]
        //[StringLength(50, ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_StringLength")]
        //public string Phone { get; set; }

        //[Display(Name = "Admin_Salon_Index_Model_Fax", ResourceType = typeof(AdminResources))]
        //[StringLength(50, ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_StringLength")]
        //public string Fax { get; set; }

        //[AllowHtml]
        //[Display(Name = "Admin_Salon_Index_Model_Des", ResourceType = typeof(AdminResources))]
        //public string Des { get; set; }

        //[Display(Name = "Admin_Salon_Index_Model_Address", ResourceType = typeof(AdminResources))]
        //[Required(ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_Required")]
        //[StringLength(500, ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_StringLength")]
        //public string Address { get; set; }

        //[Display(Name = "Admin_Salon_Index_Model_StateProvinceId", ResourceType = typeof(AdminResources))]
        //public int? StateProvinceId { get; set; }

        //[Display(Name = "Admin_Salon_Index_Model_Location", ResourceType = typeof(AdminResources))]
        //public string Location { get; set; }

        //public double? LocationX { get; set; }

        //public double? LocationY { get; set; }

        //[AllowHtml]
        //[Display(Name = "Admin_Salon_Index_Model_LiveChat", ResourceType = typeof(AdminResources))]
        //[StringLength(1000, ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_StringLength")]
        //public string LiveChat { get; set; }


        //[Display(Name = "Admin_Salon_Index_Model_FacebookUrl", ResourceType = typeof(AdminResources))]
        //[StringLength(200, ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_StringLength")]
        //public string FacebookUrl { get; set; }


        //[Display(Name = "Admin_Salon_Index_Model_GooglePlus", ResourceType = typeof(AdminResources))]
        //[StringLength(200, ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_StringLength")]
        //public string GooglePlus { get; set; }


        //[Display(Name = "Admin_Salon_Index_Model_Pinterest", ResourceType = typeof(AdminResources))]
        //[StringLength(200, ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_StringLength")]
        //public string Pinterest { get; set; }


        //[Display(Name = "Admin_Salon_Index_Model_Twitter", ResourceType = typeof(AdminResources))]
        //[StringLength(200, ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_StringLength")]
        //public string Twitter { get; set; }


        //[Display(Name = "Admin_Salon_Index_Model_WorkingDate", ResourceType = typeof(AdminResources))]
        //[StringLength(200, ErrorMessageResourceType = typeof(CommonResources), ErrorMessageResourceName = "Model_StringLength")]
        //public string WorkingDate { get; set; }


        //[Display(Name = "Admin_Salon_Index_Model_ListServiceId", ResourceType = typeof(AdminResources))]
        //public int[] ListServiceId { get; set; }
    }
}
