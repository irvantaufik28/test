// README
// ======
//
// Ini adalah contoh aplikasi Instant Messaging sederhana, sebut saja WazzApp.
// Di setiap skenario telah dituliskan komentar untuk membantu Anda memahami kebutuhan fungsional yang harus diimplementasi.
//
// Misi Anda adalah melengkapi potongan kode yang disediakan sehingga aplikasi dapat berjalan sesuai kebutuhan.
//
// OUTPUT YANG DIHARAPKAN:
//
// Anton bergabung ke semua channel
// Budi bergabung ke channel Anak Gaul
// Jumlah anggota Anak Gaul: 2
// Jumlah anggota Anak Alay: 1
//
// Anton:Selamat datang Budi
// Budi:Terima kasih sudah diundang kemari
// Anton:No problemo
//
// List channel terurut abjad:
// Anak Alay
// Anak Gaul
// Flat Earth
//
// List channel terurut jumlah anggota:
// Anak Gaul(2)
// Anak Alay(1)
// Flat Earth(1)
//
// Daftar channel dimana Anton terdaftar:
// Anak Alay
// Anak Gaul
// Flat Earth
//
// Daftar channel dimana Budi terdaftar:
// Anak Gaul
//
// Citra bergabung ke WazzApp
// Citra mencari channel yang mengandung kata "Anak" dan bergabung ke channel yang muncul di hasil pencarian
// Anak Gaul
// Anak Alay
//
// Daftar anggota channel Gaul:
// Anton
// Budi
// Citra

"use strict";

class WazzApp {
  run() {
    // Anton dan Budi bergabung ke WazzApp
    let anton = new Person("Anton");
    let budi = new Person("Budi");

    // Channel yang tersedia saat ini ada 3
    let channelGaul = Channel.create("Anak Gaul");
    let channelAlay = Channel.create("Anak Alay");
    let channelFlatEarth = Channel.create("Flat Earth");

    debug("Anton bergabung ke semua channel");
    anton.joinChannel(channelAlay);
    anton.joinChannel(channelGaul);
    anton.joinChannel(channelFlatEarth);

    debug("Budi bergabung ke channel Anak Gaul");
    budi.joinChannel(channelGaul);

    // Secara tidak sengaja, Budi join lagi ke channel Anak Gaul.
    // Karena sebelumnya sudah join, maka tidak ada efek samping yang ditimbulkan.
    // Jumlah anggota channel Gaul tetap 2
    budi.joinChannel(channelGaul);

    // Jumlah anggota channel Anak Gaul = 2, sedangkan channel Anak Alay = 1
    debug("Jumlah anggota Anak Gaul: " + channelGaul.getMemberCount());
    debug("Jumlah anggota Anak Alay: " + channelAlay.getMemberCount());

    debug("");

    // Anton dan Budi saling bertukar pesan di channel Gaul

    // Anton mengirim pesan
    channelGaul.addMessage(new Message(anton, "Selamat datang Budi"));
    // Budi membalas
    channelGaul.addMessage(new Message(budi, "Terima kasih sudah diundang kemari"));
    // Anton membalas lagi
    channelGaul.addMessage(new Message(anton, "No problemo"));

    // Tampilkan pesan dalam urutan pesan baru ada di bawah
    for (const message of channelGaul.getMessages()) {
      debug(message.toString());
    }

    // Tampilkan semua channel secara alfabetis
    debug("List channel terurut abjad:");
    for (const availableChannel of Channel.getListByName()) {
      debug(availableChannel.getName());
    }

    debug("");

    debug("List channel terurut jumlah anggota:");
    for (const availableChannel of Channel.getListByMemberCount()) {
      debug(availableChannel.getName() + "(" + availableChannel.getMemberCount() + ")");
    }

    debug("");

    debug("Daftar channel dimana Anton terdaftar:");
    for (const channel of anton.getChannels()) {
      debug(channel.getName());
    }

    debug("");

    debug("Daftar channel dimana Budi terdaftar:");
    for (const channel of budi.getChannels()) {
      debug(channel.getName());
    }

    debug("");

    debug("Citra bergabung ke WazzApp");
    let citra = new Person("Citra");

    debug('Citra mencari channel yang mengandung kata "Anak" dan bergabung ke channel yang muncul di hasil pencarian');
    let channelAnak = Channel.search("anak");
    for (const channel of channelAnak) {
      debug(channel.getName());
      citra.joinChannel(channel);
    }

    debug("");

    debug("Daftar anggota channel Gaul:");
    for (const member of channelGaul.getMembers()) {
      debug(member.getName());
    }
    return;
  }
}

class Message {
  constructor(person, message) {
    this.person = person;
    this.message = message;
  }

  getPerson() {
    return this.person;
  }

  getMessage() {
    return this.message;
  }

  toString() {
    return `${this.person.getName()} : ${this.message}`;
  }
}

class Person {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  joinChannel(channel) {
    channel.addMember(this);
  }

  getChannels() {
    return Channel.getChannelByMember(this);
  }
}

class Channel {
  name = null;
  members = [];
  messages = [];
  static channelList = [];

  constructor(name) {
    this.name = name;
  }

  static create(name) {
    const newChannel = new Channel(name);
    this.channelList.push(newChannel);

    return newChannel;
  }

  getName() {
    return this.name;
  }

  static getList() {
    return this.channelList;
  }

  static getListByName() {
    const lists = this.getList();
    return lists.sort((a, b) => {
      if (a.getName() < b.getName()) {
        return -1;
      }
      if (a.getName() > b.getName()) {
        return 1;
      }
      return 0;
    });
  }

  static getListByMemberCount() {
    const lists = this.getList();
    return lists.sort((a, b) => b.getMemberCount() - a.getMemberCount());
  }

  addMember(person) {
    if (!this.members.includes(person)) this.members.push(person);
  }

  getMembers() {
    return this.members;
  }

  static getChannelByMember(person) {
    const lists = this.channelList.filter((channel) => channel.getMembers().includes(person));
    return lists.sort((a, b) => {
      if (a.getName() < b.getName()) {
        return -1;
      }
      if (a.getName() > b.getName()) {
        return 1;
      }
      return 0;
    });
  }

  getMemberCount() {
    return this.members.length;
  }

  addMessage(message) {
    this.messages.push(message);
  }

  getMessages() {
    return this.messages;
  }

  static search(search) {
    return this.channelList.filter((channel) => channel.getName().toLowerCase().includes(search.toLowerCase()));
  }
}

function debug(string) {
  console.log(string);
}

const app = new WazzApp();
app.run();
