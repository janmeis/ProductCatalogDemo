using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalogDemo.Api.Models
{
	public class Product
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public long Id { get; set; }
		public string Name { get; set; }
		public string Code { get; set; }
		public string ExtCode { get; set; }
		public string ExtGroup { get; set; }
		public string LongName { get; set; }
		public bool Visibility { get; set; }
		public bool Editability { get; set; }
		public string Type { get; set; }
		public string Description { get; set; }
	}
}
