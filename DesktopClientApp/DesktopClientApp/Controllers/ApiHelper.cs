using System.Text;
using System.Net.Http;
using Newtonsoft.Json;
using DesktopClientApp.Models;
using System.Windows;
using System;
using System.Net.Http.Headers;

namespace DesktopClientApp.Controllers
{
    public class ApiHelper
    {
        public static Wallet getWallet(string token, int userid, string url)
        {
            // get wallet data
            try
            {
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                    var str = "{\"userid\": 0}".Replace("0", userid.ToString());
                    var json = JsonConvert.SerializeObject(str);
                    var body = new StringContent(str, Encoding.UTF8, "application/json");
                    var result = client.PostAsync(url, body).Result.Content;
                    var response = JsonConvert.DeserializeObject<Response>(result.ReadAsStringAsync().Result);
                    if (response.success == true)
                    {
                        return response.wallet;
                    }
                    else
                        MessageBox.Show(response.message);
                }
                
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            return null;
        }

        public static void uploadWallet(Wallet wallet, string url)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", wallet.token);
                    var json = JsonConvert.SerializeObject(wallet);
                    var body = new StringContent(json, Encoding.UTF8, "application/json");
                    var result = client.PostAsync(url, body).Result.Content;
                    var response = JsonConvert.DeserializeObject<Response>(result.ReadAsStringAsync().Result);
                    if (response.success == true)
                    {
                        MessageBox.Show("Wallet Uploaded Successfully");
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
    }
}
