using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DesktopClientApp.Models
{
    public class Wallet
    {
        public Wallet()
        {
            this.balance = 0;
        }
        public double balance { get; set; }
    }
}
