using System;
using System.Drawing;
using System.Windows.Forms;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using System.Net.Http;
using DesktopClientApp.Models;
using Newtonsoft.Json;
using System.Text;

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

        public static bool IsInternetConnected()
        {
            int Desc;
            return InternetGetConnectedState(out Desc, 0);
        }

        private void frmLogin_Load(object sender, EventArgs e)
        {
            tInternetCheck.Start();
            
            if (!IsInternetConnected())
            {
                disableLogin();
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
            this.Show();
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
            using(var client = new HttpClient())
            {
                var endpoint = "http://localhost:5000/auth/login";
                var user = new User
                {
                    email = txtEmail.Text,
                    password = txtPassword.Text,
                };
                var userJson = JsonConvert.SerializeObject(user);
                var body = new StringContent(userJson, Encoding.UTF8, "application/json");
                var result = client.PostAsync(endpoint, body).Result.Content;
                var response = JsonConvert.DeserializeObject<Response>(result.ReadAsStringAsync().Result);
                if (response.success == true)
                {
                    txtEmail.Clear();
                    txtPassword.Clear();
                    this.Hide();
                    user.accessToken = response.token;
                    user.username = response.username;
                    user.userid = response.userid;
                    tInternetCheck.Stop();
                    frmMain main = new frmMain(user);
                    main.ShowDialog();
                    tInternetCheck.Start();
                    this.Show();
                }
                else
                    MessageBox.Show(response.message);
            }
            
        }
        private void disableLogin()
        {
            btnLogin.Enabled = false;
            btnRegister.Enabled = false;
            // center the notification message
            Rectangle parentRect = lblNotificationMessage.Parent.ClientRectangle;
            lblNotificationMessage.Left = (parentRect.Width - lblNotificationMessage.Width) / 2;
            lblNotificationMessage.Visible = true;
        }

        private void tInternetCheck_Tick(object sender, EventArgs e)
        {
            if (!IsInternetConnected())
            {
                disableLogin();
            }
            else
            {
                btnLogin.Enabled = true;
                btnRegister.Enabled = true;
                lblNotificationMessage.Visible = false;
            }
        }
    }
}
