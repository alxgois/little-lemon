import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, nome text, preco text, descricao text, categoria text, imagem text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `INSERT INTO menuitems (nome, preco, descricao, categoria, imagem) VALUES ${menuItems
          .map(
            (item) =>
              `('${item.name.replace(/'/g, "''")}', '${item.price}', '${item.description.replace(/'/g, "''")}', '${item.category}', '${item.image}')`
          )
          .join(', ')};`,
        [],
        () => { console.log('Itens salvos com sucesso no banco de dados.'); },
        (_, error) => { console.error('Erro ao salvar itens do menu:', error.message); }
      );
    }
  );
}

export function deleteAllMenuItems() {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'DELETE FROM menuitems;'
      );
    },
    (_, error) => { console.error('Erro ao deletar todos os itens do menu:', error); }
  );
}

export function dropTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'DROP TABLE IF EXISTS menuitems;',
          [],
          () => { resolve('Tabela deletada com sucesso.'); },
          (_, error) => { reject(`Erro ao deletar tabela: ${error.message}`); }
        );
      },
      (error) => { reject(`Erro ao executar transação: ${error.message}`); }
    );
  }).then(message => console.log(message)).catch(error => console.error(error));
}

// export async function filterByQueryAndCategories(query, activeCategories) {
//   return new Promise((resolve, reject) => {
//     if (!query) {
//       db.transaction((tx) => {
//         tx.executeSql(
//           `select * from menuitems where ${activeCategories
//             .map((category) => `category='${category}'`)
//             .join(' or ')}`,
//           [],
//           (_, { rows }) => {
//             resolve(rows._array);
//           }
//         );
//       }, reject);
//     } else {
//       db.transaction((tx) => {
//         tx.executeSql(
//           `select * from menuitems where (title like '%${query}%') and (${activeCategories
//             .map((category) => `category='${category}'`)
//             .join(' or ')})`,
//           [],
//           (_, { rows }) => {
//             resolve(rows._array);
//           }
//         );
//       }, reject);
//     }
//   });
// }







// const db = SQLite.openDatabaseAsync('little_lemon');

// export async function createTable() {
//     try {
//       await db.execAsync(`
//         CREATE TABLE IF NOT EXISTS menuitems (
//           id INTEGER PRIMARY KEY NOT NULL,
//           nome TEXT,
//           preco TEXT,
//           descricao TEXT,
//           categoria TEXT
//         );
//       `);
//       console.log('Tabela criada com sucesso');
//     } catch (error) {
//       console.error('Erro ao criar tabela', error);
//       throw error;
//     }
//   }

// export async function getMenuItems() {
//     try {
//       const allRows = await db.getAllAsync('SELECT * FROM menuitems;');
//       return allRows;
//     } catch (error) {
//       console.error('Erro ao obter itens do menu', error);
//       throw error;
//     }
//   }
  

// export async function saveMenuItems(menuItems) {
//     try {
//       for (const item of menuItems) {
//         const result = await db.runAsync(
//           'INSERT INTO menuitems (id, nome, preco, descricao, categoria) VALUES (?, ?, ?, ?, ?);',
//           [item.id, item.nome, item.preco, item.descricao, item.categoria]
//         );
//         console.log('Item inserido com sucesso', result);
//       }
//     } catch (error) {
//       console.error('Erro ao inserir item', error);
//     }
//   }
