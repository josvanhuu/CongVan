using Kids.Services.ImportExport;
using Synvata.MsOfficeFileGenerator.Excel;

namespace CongVan.Entities
{
    public class ExportDocument: ExportEntity
    {
        [ExcelColumn("Name",1)]
        public string FullName { get; set; }

        [ExcelColumn("Description", 2)]
        public string Description { get; set; }
    }
}