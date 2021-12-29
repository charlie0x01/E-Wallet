namespace DesktopClientApp
{
    partial class frmMessage
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.lblNotificationMessage = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // lblNotificationMessage
            // 
            this.lblNotificationMessage.AutoSize = true;
            this.lblNotificationMessage.Font = new System.Drawing.Font("Microsoft YaHei UI", 15F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblNotificationMessage.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(217)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))));
            this.lblNotificationMessage.Location = new System.Drawing.Point(85, 49);
            this.lblNotificationMessage.Name = "lblNotificationMessage";
            this.lblNotificationMessage.Size = new System.Drawing.Size(190, 27);
            this.lblNotificationMessage.TabIndex = 6;
            this.lblNotificationMessage.Text = "No Internet Access";
            // 
            // frmMessage
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(361, 124);
            this.Controls.Add(this.lblNotificationMessage);
            this.Name = "frmMessage";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterParent;
            this.Text = "frmMessage";
            this.Load += new System.EventHandler(this.frmMessage_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label lblNotificationMessage;
    }
}