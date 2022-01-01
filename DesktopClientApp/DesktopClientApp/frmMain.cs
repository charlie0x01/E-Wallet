using System;
using System.Drawing;
using System.Windows.Forms;
using DesktopClientApp.Models;
using Newtonsoft.Json;
using DesktopClientApp.Controllers;

namespace DesktopClientApp
{
    public partial class frmMain : Form
    {
        private User logedUser;
        private Wallet wallet;
        private bool InternetError = false;
        public frmMain()
        {
            
            InitializeComponent();
            wallet = new Wallet();
        }
        public void setUser(User user)
        {
            logedUser = user;
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
            uploadData();
            if (!logout)
                Application.Exit();
            logout = false;
        }

        // rearrange all controls on resize
        private void frmMain_Resize(object sender, EventArgs e) => arrangeControls();

        private void btnLogout_Click(object sender, EventArgs e)
        {
            logout = true;
            this.Close();
        }

        private void frmMain_Load(object sender, EventArgs e)
        {
            lblUsername.Text = logedUser.username;
            lblEmail.Text = logedUser.email;
            var wall = ApiHelper.getWallet(logedUser.accessToken, logedUser.userid, "http://localhost:5000/get/wallet");
            cashDeposit(wall.balance);
            wallet.balance = 0;
            wallet = wall;
            wallet.token = logedUser.accessToken;
            wallet.userid = logedUser.userid;
            gdvExpenses.DataSource = null;
            gdvExpenses.DataSource = wallet.expenses;
            loadChart();
            tInternetCheck.Start();
        }

        private void cashDeposit(double balance)
        {
            wallet.balance += balance;
            lblBalance.Text = wallet.balance.ToString();
            // center the balance label
            Rectangle parentBalance = lblBalance.Parent.ClientRectangle;
            lblBalance.Left = (parentBalance.Width - lblBalance.Width) / 2;
        }

        private void btnCashDeposit_Click(object sender, EventArgs e)
        {
            frmCashDeposit frmCashDeposit = new frmCashDeposit();
            frmCashDeposit.ShowDialog();
            cashDeposit(frmCashDeposit.balance);
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

        private void btnAddNewExpense_Click(object sender, EventArgs e)
        {
            frmAddNewExpense frmAddNewExpense = new frmAddNewExpense();
            frmAddNewExpense.ShowDialog();
            if (wallet.balance >= frmAddNewExpense.amount && frmAddNewExpense.amount != 0 && frmAddNewExpense.desc != String.Empty)
            {
                wallet.balance -= frmAddNewExpense.amount;
                lblBalance.Text = wallet.balance.ToString();
                wallet.expenses.Add(new Expense() { description = frmAddNewExpense.desc, amount = frmAddNewExpense.amount, date = DateTime.Now.ToShortDateString() });
                gdvExpenses.DataSource = null;
                gdvExpenses.DataSource = wallet.expenses;
                loadChart();
            }
            else
                MessageBox.Show("Insufficiant Balance");
        }
        private void loadChart()
        {
            try
            {

                chrtExpenses.DataSource = wallet.expenses;

                // set series members names for the X and Y values
                chrtExpenses.Series["Expense"].XValueMember = "description";
                chrtExpenses.Series["Expense"].YValueMembers = "amount";

                // data bind to the selected data source
                chrtExpenses.DataBind();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            
        }

        private void gdvExpenses_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            try
            {
                if (gdvExpenses.Columns[e.ColumnIndex].Name == "Delete")
                {
                    foreach (var expense in wallet.expenses)
                    {
                        if (gdvExpenses.Rows[e.RowIndex].Cells[0].Value.ToString() == expense.description && Convert.ToDouble(gdvExpenses.Rows[e.RowIndex].Cells[1].Value) == expense.amount && gdvExpenses.Rows[e.RowIndex].Cells[2].Value.ToString() == expense.date)
                        {
                            cashDeposit(expense.amount);
                            wallet.expenses.Remove(expense);
                            loadChart();
                            break;
                        }
                    }
                    gdvExpenses.DataSource = null;
                    gdvExpenses.DataSource = wallet.expenses;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            
        }

        private void uploadData()
        {
            try
            {
                ApiHelper.uploadWallet(wallet, "http://localhost:5000/update/wallet");
            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message);
            }
        }
    }//
}
