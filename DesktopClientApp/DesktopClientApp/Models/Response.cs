using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DesktopClientApp.Models
{
    public class Response
    {
        public Response()
        {
            wallet = new Wallet();
        }
        public bool success { get; set; }
        public string message { get; set; }
        public string token { get; set; }
        public string username { get; set; }
        public int userid { get; set; }
        public Wallet wallet { get; set; }
    }
}
