using Kids.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CongVan.Entities
{
    public class Organization : Entity
    {
        public string Name { get; set; }
        public string Des { get; set; }
        public string Code { get; set; }

    }
}