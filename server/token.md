## about token

JWT 代表 JSON Web Token ，它是一种用于认证头部的 token 格式。这个 token 帮你实现了在两个系统之间以一种安全的方式传递信息。出于教学目的，我们暂且把 JWT 作为“不记名 token”。一个不记名 token 包含了三部分：
 1. header
 - payload
 - signature

header 是 token 的一部分，用来存放 token 的类型和编码方式，通常是使用 base-64 编码。

payload 包含了信息。你可以存放任一种信息，比如用户信息，产品信息等。它们都是使用 base-64 编码方式进行存储。

signature 包括了 header，payload 和密钥的混合体。密钥必须安全地保存储在服务端。

主要3个方法:

- jwt.sign
- jwt.verify
- jwt.decode

需要小心的密钥在多线程或集群下的处理。

*加解密一个对象的时间，远远比查询数据库的代价小*，唯一可能有的是token有效期的校验，代价极其小。
