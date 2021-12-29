using System;
using System.Drawing;
using System.Net.Http;
using System.Text;
using System.Windows.Forms;
using DesktopClientApp.Models;
using Newtonsoft.Json;

namespace DesktopClientApp
{
    public partial class frmRegister : Form
    {
        public frmRegister()
        {
            InitializeComponent();
        }
        private Point _mouseLoc;

        private void lblAlreadyRegistered_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void btnRegister_Click(object sender, EventArgs e)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    var endpoint = "http://localhost:5000/auth/register";
                    var user = new User
                    {
                        username = txtUsername.Text,
                        email = txtEmail.Text,
                        password = txtPassword.Text,
                    };
                    var userJson = JsonConvert.SerializeObject(user);
                    var body = new StringContent(userJson, Encoding.UTF8, "application/json");
                    var result = client.PostAsync(endpoint, body).Result.Content;
                    var response = JsonConvert.DeserializeObject<Response>(result.ReadAsStringAsync().Result);
                    if (response.success == true)
                    {
                        MessageBox.Show(response.message);
                        this.Close();
                    }
                    else
                        MessageBox.Show(response.message);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
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

        private void pbExit_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void pbMinimize_Click(object sender, EventArgs e)
        {
            this.WindowState = FormWindowState.Minimized;
        }

        private void chkShowPassword_CheckedChanged(object sender, EventArgs e)
        {
            if (chkShowPassword.Checked)
                txtPassword.UseSystemPasswordChar = false;
            else
                txtPassword.UseSystemPasswordChar = true;
        }
    }
}
