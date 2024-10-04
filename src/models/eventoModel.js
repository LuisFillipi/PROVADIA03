import conn from "../config/conn.js";

const tableEvento = /*sql*/`
create table if not exists eventos(
    evento_id varchar(60) primary key,
    titulo varchar(255) not null,
    localizacao varchar(255) not null,
    feedback varchar(255) not null,
    comentario varchar(255) not null,
    nota float,
    descricao text,
    palestrante_id varchar(255) not null,
    telefone varchar(255) not null,
    created_at timestamp default value current_timestamp,
    updated_at timestamp default value current_timestamp on update current_timestamp,
    foreign key (palestrante_id) references palestrante(palestrante_id)
)
`;

conn.query(tableEvento, (err)=> {
    if(err){
        console.error(err)
        return
    }
    console.log("tabela [evento] criado com sucesso")
})

// base do desapega!