using System;
using System.Collections.Generic;

namespace DesktopClientApp.Models
{
    public class Wallet
    {
        public Wallet()
        {
            this.balance = 0;
            this.expenses = new List<Expense>();
        }
        public double balance { get; set; }
        public string token { get; set; }
        public int userid { get; set; }
        public List<Expense> expenses { get; set; }
    }
}
