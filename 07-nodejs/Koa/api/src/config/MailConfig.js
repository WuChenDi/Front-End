import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
async function send(sendInfo) {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	// let testAccount = await nodemailer.createTestAccount();

	// create reusable transporter object using the default SMTP transport
	const transporter = nodemailer.createTransport({
		host: "smtp.qq.com",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: "996194720@qq.com", // generated ethereal user
			pass: "", // generated ethereal password
		},
  });
  
  let url = "http://www.baidu.com";

	// send mail with defined transport object
	const info = await transporter.sendMail({
		from: '"认证邮件" <996194720@qq.com>', // sender address
		to: sendInfo.email, // list of receivers
		subject: sendInfo.user !== "" && sendInfo.type !== "email" ? `你好开发者，${sendInfo.type === "reset" ? "重置密码链接！" : "注册码！"}` : "确认修改邮件链接", // Subject line
		text: `您的邀请码是${sendInfo.code},邀请码的过期时间: ${sendInfo.expire}`, // plain text body
    html: `
    <div style="border: 1px solid #dcdcdc;color: #676767;width: 600px; margin: 0 auto; padding-bottom: 50px;position: relative;">
      <div style="padding: 25px">
        <div>你好，${sendInfo.user}童鞋，重置链接有效时间30分钟，请在${sendInfo.expire}之前${sendInfo.code ? '重置您的密码' : '修改您的邮箱为：' + sendInfo.data.username}：</div>
        <a href="${url}" style="padding: 10px 20px; color: #fff; background: #009e94; display: inline-block;margin: 15px 0;">${sendInfo.code ? '立即重置密码' : '确认设置邮箱'}</a>
      </div>
    </div>
    ` // html body
	});

	return `Message sent: %s, ${info.messageId}`;
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);
export default send;
