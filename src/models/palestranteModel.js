import conn from "../config/conn.js";

const tablePalestrantes = /*sql*/`
create table if not exists palestrantes(
    palestrante_id varchar(60) primary key,
    nome varchar(255) not null,
    cargo varchar(255) not null,
    telefone varchar(255) not null,
    created_at timestamp default value current_timestamp,
    updated_at timestamp default value current_timestamp on update current_timestamp,
)
`;

conn.query(tablePalestrantes, (err)=> {
    if(err){
        console.error(err)
        return
    }
    console.log("tabela [palestrante] criado com sucesso")
})

// base do desapega!