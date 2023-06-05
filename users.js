var users = [
    {
      id: 1,
      username: 'goldroger',
      name: 'Gol D. Roger',
      position: 'Pirate King'
    },
    {
      id: 2,
      username: 'mrzero',
      name: 'Sir Crocodile',
      position: 'Former-Shichibukai'
    },
    {
      id: 3,
      username: 'luffy',
      name: 'Monkey D. Luffy',
      position: 'Captain'
    },
    {
      id: 4,
      username: 'kuzan',
      name: 'Aokiji',
      position: 'Former Marine Admiral'
    },
    {
      id: 5,
      username: 'shanks',
      name: "'Red-Haired' Shanks",
      position: 'The 4 Emperors'
    }
  ]
  
  exports.findAll = function () {
    return users
  }
  
  exports.findById = function (id) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == id) return users[i]
    }
  }

  exports.create = function(itm) {
    max_id = Math.max(...users.map(o => o.id));
    users.push({
      id: max_id+1,
      username: itm.username,
      name: itm.name,
      position: itm.position
    });
    return max_id + 1;
  }

  exports.update = function(id, itm) {
    users = users.map(function(o){
      return o.id != id ? o : {
        id: itm.id,
        username: itm.username ? itm.username : o.username,
        name: itm.name ? itm.name : o.name,
        position: itm.position ? itm.position : o.position 
      }
    })
    return users.find(o => o.id == id);
  }

  exports.delete = function(id) {
    users = users.filter(o => o.id != id);
    return id;
  } 
  