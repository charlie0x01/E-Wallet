namespace DesktopClientApp.Models
{
    public class User
    {

        public User(int id = 0, string name = null, string email = null, string password = null, string accessToken = null, string resetToken = null)
        {
            this.userid = id;
            this.username = name;
            this.email = email;
            this.password = password;
            this.accessToken = accessToken;
            this.resetToken = resetToken; 
        }
        public int userid { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string accessToken { get; set; }
        public string resetToken { get; set; }
    }
}
