<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Composerのオートローダーを読み込む
require 'vendor/autoload.php';

// フォームから送信されたデータを取得
$name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');
$subject = htmlspecialchars($_POST['subject'], ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8');

// PHPMailerのインスタンスを作成
$mail = new PHPMailer(true);

try {
    // SMTP設定
    $mail->isSMTP();                                      // SMTPを使用
    $mail->Host       = 'smtp.example.com';               // SMTPサーバーのホスト名
    $mail->SMTPAuth   = true;                             // SMTP認証を有効化
    $mail->Username   = 'webinquiry.childays@gmail.com';         // SMTPサーバーのユーザー名
    $mail->Password   = 'aqcvqyukmvumlyzu';            // SMTPサーバーのパスワード
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;   // 暗号化方式（TLS）
    $mail->Port       = 587;                              // SMTPポート（通常587）

    // 送信元情報
    $mail->setFrom($email, $name);                        // 送信元（フォーム送信者の情報）
    $mail->addReplyTo($email, $name);                     // 返信先

    // 送信先情報
    $mail->addAddress('namekuji.kouya0309@gmail.com');          // 宛先（受信者のメールアドレス）

    // メール内容
    $mail->isHTML(true);                                  // HTML形式を有効化
    $mail->Subject = 'お問い合わせ: ' . $subject;           // 件名
    $mail->Body    = '<h3>お問い合わせ内容</h3>
                      <p><strong>お名前:</strong> ' . $name . '</p>
                      <p><strong>メールアドレス:</strong> ' . $email . '</p>
                      <p><strong>件名:</strong> ' . $subject . '</p>
                      <p><strong>内容:</strong><br>' . nl2br($message) . '</p>'; // 本文（HTML）
    $mail->AltBody = "お名前: $name\nメールアドレス: $email\n件名: $subject\n内容:\n$message"; // プレーンテキストの本文

    // メール送信
    $mail->send();
    echo 'お問い合わせを受け付けました。ありがとうございます！';
} catch (Exception $e) {
    echo "メールの送信に失敗しました。エラー: {$mail->ErrorInfo}";
}
?>
