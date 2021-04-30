# Wormhole

Wormhole is a website frame that built to provide RSA-based encryption chatting service to those who know little knowledge about encrypted communication. We aim to build a framework that only for small amount of users and easy to host on any VPS. 

![image-20210430041453815](https://tva1.sinaimg.cn/large/008i3skNly1gq1zi2yi66j31d00u0b2g.jpg)

## Demo

We are still figuring a convenient way to deploy on popular VPS like Heroku or AWS, so current you could only test it on your local environment

## Install Instruction

- Set up backend

  - Run

    ```
    npm install
    ```

    Under `/api` directory to install back-end dependency

  - run

    ```
    node server.js
    ```

    to serve the backend

- Set up front-end

  - Run

    ```
    npm install
    ```

    Under `/client` directory to install back-end dependency

  - run

    ```
    npm start
    ```

    to start front-end, then you could visit `localhost:3000` to try our demo.



## UI Prototype

The prototype comes with Figma:

https://www.figma.com/file/BUfiCOl7OH6PlY1VYMJGU6/wormhole?node-id=0%3A1

## Algorithm

We purposed an algorithm that only replies on the safety of conversation session host, who is the one that starts the encrypted conversation. Let's call our host Alice.

1. Alice starts an encrypted conversation from her browser client. The client use an asymmetric encryption algorithms to generate key pair $(e_1,d_1)$, then it generates the hash of public key $e_1$ as $h(e_1)$, send it to our server as the identification number of this conversation.
2. Alice send $e_1$ to her designed receiver, Bob.
3. Bob received the encryption key $e_1$ and open a conversation session with Alice, by using $h(e_1)$  as identifier we guarantee the uniqueness of this session. The client of Bob would randomly generates a key pair $(e_2,d_2)$ using the same asymmetric encryption algorithms, then the client send $e_2$ to Alice in the ciphertext.
4. Alice decipher the ciphertext using $d_1$, then she gets Bob's encryption key $e_2$, they could start communication.

This algorithm is based on the fact that there is at least one secure way between Bob and Alice to communicate, otherwise the adversary could use $e_1$ to impersonate Bob and wiretap the conversation. In order to mitigate this possibility, we strongly suggest user to validate each-others' identity first. (With that being said, it's a real-time conversation, so unless the receiver was wiretapped 24x7,  it's not easy to make the impersonation attack. This website is vulnerable to DOS attack, but it could be avoided by deploying on different VPS and visiting the IP address directly.




