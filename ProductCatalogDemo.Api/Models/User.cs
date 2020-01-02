﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalogDemo.Api.Models
{
	public class User
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public long Id { get; set; }
		[StringLength(100)]
		public string Username { get; set; }
		[StringLength(100)]
		public string Password { get; set; }
		[StringLength(100)]
		public string email { get; set; }
	}
}
