using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Windows.Forms;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using DesktopClientApp.Models;

namespace DesktopClientApp
{
    public partial class frmForgetPassword : Form
    {
        public frmForgetPassword()
        {
            InitializeComponent();
        }

        private void btnSend_Click(object sender, EventArgs e)
        {
            //try
            //{
            //    if (txtEmail.Text != String.Empty)
            //    {
            //        using (var client = new HttpClient())
            //        {
            //            //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            //            var str = "{\"email\": 0}".Replace("0", txtEmail.Text);
            //            var json = JsonConvert.SerializeObject(str);
            //            var body = new StringContent(str, Encoding.UTF8, "application/json");
            //            var result = client.PostAsync("http://localhost:5000/auth/forgetpassword", body).Result.Content;
            //            var response = JsonConvert.DeserializeObject<Response>(result.ReadAsStringAsync().Result);
            //            if (response.success == true)
            //            {
            //                return response.wallet;
            //            }
            //            else
            //                MessageBox.Show(response.message);
            //        }
            //            else
            //            MessageBox.Show(response.message);
            //    }
            //}


            //}
            //catch (Exception ex)
            //{
            //    MessageBox.Show(ex.Message);
            //}
}
    }
}
