using System;
using System.Drawing;
using System.Windows.Forms;
using DesktopClientApp.Models;

namespace DesktopClientApp
{
    public partial class frmMain : Form
    {
        public User logedUser;
        public Wallet wallet;
        private bool InternetError = false;
        public frmMain(User user)
        {
            logedUser = user;
            InitializeComponent();
            wallet = new Wallet();
        }

        private bool logout = false;

        private void arrangeControls()
        {
            // center the title
            Rectangle parentRect = lblTitle.Parent.ClientRectangle;
            lblTitle.Left = (parentRect.Width - lblTitle.Width) / 2;
            // center the Penal One
            Rectangle parentPanelOne = flpContainer.Parent.ClientRectangle;
            flpContainer.Left = (parentPanelOne.Width - flpContainer.Width) / 2;
            flpContainer.Height = (parentPanelOne.Height - 90);
        }

        private void frmMain_FormClosed(object sender, FormClosedEventArgs e)
        {
            if (!logout)
                Application.Exit();
            logout = false;
        }

        // rearrange all controls on resize
        private void frmMain_Resize(object sender, EventArgs e) => arrangeControls();

        private void lblBalance_TextChanged(object sender, EventArgs e)
        {
            // center the balance label
            Rectangle parentBalance = lblBalance.Parent.ClientRectangle;
            lblBalance.Left = (parentBalance.Width - lblBalance.Width) / 2;
        }

        private void btnLogout_Click(object sender, EventArgs e)
        {
            logout = true;
            this.Close();
        }

        private void frmMain_Load(object sender, EventArgs e)
        {
            lblUsername.Text = logedUser.username;
            lblEmail.Text = logedUser.email;
            tInternetCheck.Start();
        }

        private void btnCashDeposit_Click(object sender, EventArgs e)
        {
            frmCashDeposit frmCashDeposit = new frmCashDeposit();
            frmCashDeposit.ShowDialog();
            wallet.balance += frmCashDeposit.balance;
            lblBalance.Text = wallet.balance.ToString();
        }

        private void tInternetCheck_Tick(object sender, EventArgs e)
        {

            if (!frmLogin.IsInternetConnected() && InternetError == false)
            {
                InternetError = true;
                frmMessage frmMessage = new frmMessage();
                frmMessage.ShowDialog();
                InternetError = false;
            }
        }
    }
}
