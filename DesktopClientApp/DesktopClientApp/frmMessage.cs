using System;
using System.Drawing;
using System.Windows.Forms;

namespace DesktopClientApp
{
    public partial class frmMessage : Form
    {
        public frmMessage()
        {
            InitializeComponent();
        }

        private void frmMessage_Load(object sender, EventArgs e)
        {
            // center the notification message
            Rectangle parentRect = lblNotificationMessage.Parent.ClientRectangle;
            lblNotificationMessage.Left = (parentRect.Width - lblNotificationMessage.Width) / 2;
        }
    }
}
