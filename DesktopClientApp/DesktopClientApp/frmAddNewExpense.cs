using System;
using System.Windows.Forms;

namespace DesktopClientApp
{
    public partial class frmAddNewExpense : Form
    {
        public frmAddNewExpense()
        {
            InitializeComponent();
        }
        public double amount;
        public string desc;

        private void btnAddExpense_Click(object sender, EventArgs e)
        {
            this.desc = txtDescription.Text;
            this.amount = Convert.ToDouble(txtAmount.Text);
            this.Close();
        }
    }
}
