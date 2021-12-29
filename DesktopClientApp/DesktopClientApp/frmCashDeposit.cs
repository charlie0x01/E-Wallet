using System;
using System.Windows.Forms;

namespace DesktopClientApp
{
    public partial class frmCashDeposit : Form
    {
        public frmCashDeposit()
        {
            InitializeComponent();
        }
        public double balance = 0;

        private void btnDeposit_Click(object sender, EventArgs e)
        {
            balance = Convert.ToDouble(txtAmount.Text);
            this.Close();
        }
    }
}
