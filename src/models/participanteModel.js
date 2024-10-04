// base do desapega!

import conn from "../config/conn.js";

const tableParticipantes = /*sql*/`
create table if not exists participantes(
    participante_id varchar(60) primary key,
    nome varchar(255) not null,
    cargo varchar(255) not null,
    telefone varchar(255) not null,
    palestrante_id varchar(60),
    created_at timestamp default value current_timestamp,
    updated_at timestamp default value current_timestamp on update current_timestamp,
    foreign key (palestrante_id) references palestrantes(palestrante_id)
)
`;

conn.query(tableParticipantes, (err)=> {
    if(err){
        console.error(err)
        return
    }
    console.log("tabela [participantes] criado com sucesso")
})

