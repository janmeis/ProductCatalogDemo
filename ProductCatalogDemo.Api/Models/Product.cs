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
		[StringLength(50)]
		public string Name { get; set; }
		[StringLength(5)]
		public string Code { get; set; }
		[StringLength(5)]
		public string ExtCode { get; set; }
		[StringLength(5)]
		public string ExtGroup { get; set; }
		[StringLength(100)]
		public string LongName { get; set; }
		public bool Visibility { get; set; }
		public bool Editability { get; set; }
		public EProductType Type { get; set; }
		public string Description { get; set; }
	}
}

public enum EProductType
{
	ProductType1 = 1,
	ProductType2 = 2,
	ProductType3 = 3,
}
