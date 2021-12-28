using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Runtime;
using System.Runtime.InteropServices;

namespace DesktopClientApp
{
    public partial class frmLogin : Form
    {
        [DllImport("wininet.dll")]
        private extern static bool InternetGetConnectedState(out int Description, int ReservedValue);
        public frmLogin()
        {
            InitializeComponent();
        }

        
        private Point _mouseLoc;

        private static bool IsInternetConnected()
        {
            int Desc;
            return InternetGetConnectedState(out Desc, 0);
        }

        private void frmLogin_Load(object sender, EventArgs e)
        {
            
            if (!IsInternetConnected())
            {
                // custom label
                lblNotificationMessage.Text = "No Internet Access";
                // center the notification message
                Rectangle parentRect = lblNotificationMessage.Parent.ClientRectangle;
                lblNotificationMessage.Left = (parentRect.Width - lblNotificationMessage.Width) / 2;
                // change label text color to red, because it's an error
                lblNotificationMessage.ForeColor = Color.FromArgb(217, 0, 0);
                lblNotificationMessage.Visible = true;
                this.Enabled = false;
            }
        }

        private void lblForgotPassword_Click(object sender, EventArgs e)
        {
            // handle forgot password request here
        }

        private void pbExit_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void pbMinimize_Click(object sender, EventArgs e)
        {
            this.WindowState = FormWindowState.Minimized;
        }

        private void pnlTopBar_MouseDown(object sender, MouseEventArgs e)
        {
            _mouseLoc = e.Location;
        }

        private void pnlTopBar_MouseMove(object sender, MouseEventArgs e)
        {
            if (e.Button == MouseButtons.Left)
            {
                int dx = e.Location.X - _mouseLoc.X;
                int dy = e.Location.Y - _mouseLoc.Y;
                this.Location = new Point(this.Location.X + dx, this.Location.Y + dy);
            }
        }

        private void btnRegister_Click(object sender, EventArgs e)
        {
            this.Hide();
            frmRegister frmregister = new frmRegister();
            frmregister.ShowDialog();
        }

        private void chkShowPassword_CheckedChanged(object sender, EventArgs e)
        {
            if (chkShowPassword.Checked)
                    txtPassword.UseSystemPasswordChar = false;
            else
                txtPassword.UseSystemPasswordChar = true;
        }

        private void btnLogin_Click(object sender, EventArgs e)
        {

        }
    }
}
