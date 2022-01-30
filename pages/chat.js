import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { createClient } from '@supabase/supabase-js';
import React from 'react';
import appConfig from '../config.json';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU1NDY4OCwiZXhwIjoxOTU5MTMwNjg4fQ.iiO74FqfvMW1d9Bo5WMFwFM8ssKITNpG5_2JKvPe67Q';
const SUPABASE_URL = 'https://lvemddmltfuaanazkvze.supabase.co';
const supabaseClient  = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/*
const dadosDoSupabase = supabaseClient
    .from('mensagens')
    .select('*')
    .then((dados) => {
        console.log('Dados da consulta:',dados);
    });
*/

export default function ChatPage() {    
    const [mensagem, setMensagem ] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    // Usa o useEffect para trazer os dados do Supabase
    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(( { data } ) => {
                //console.log('Dados da consulta:',dados);
                setListaDeMensagens(data);
            });
    }, []);    

    // Função para tratar as novas mensagens
    function handleNovaMensagem(novaMensagem){
        
        const mensagem = {
            //id: listaDeMensagens.length + 1,
            de: 'Aricelio', 
            texto: novaMensagem,
        };

        // Faz a inserção da mensagem no Supabase
        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({ data }) => {                

                // Add na lista de msgs, o que foi digitado
                setListaDeMensagens([
                    data[0],
                    ...listaDeMensagens,
                ]);
            });

        // Limpa o TextField
        setMensagem('');
    }
    
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                //backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://www.pixel4k.com/wp-content/uploads/2019/03/call-of-cthulhu-4k_1553074544.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList mensagens={listaDeMensagens} />
                    {/*listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )                            
                    })*/}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter'){
                                    
                                    // Faz o TextFiedl voltar ao estado atual
                                    event.preventDefault();

                                    // Chama a função de tratamento da nova mensagem
                                    handleNovaMensagem(mensagem);
                                }                                
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {
                props.mensagens.map((mensagem) => {
                    return (
                        <Text
                            key={mensagem.id}
                            tag="li"
                            styleSheet={{
                                borderRadius: '5px',
                                padding: '6px',
                                marginBottom: '12px',
                                hover: {
                                    backgroundColor: appConfig.theme.colors.neutrals[700],
                                }
                            }}
                        >
                            <Box
                                styleSheet={{
                                    marginBottom: '8px',
                                }}
                            >
                                <Image
                                    styleSheet={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                    }}
                                    src={`https://github.com/${mensagem.de}.png`}

                                    // Finalizar a função...
                                    onMouseEnter={function handler(event){
                                        console.log("Mouse entrou: ", event);
                                    }}

                                    // Finalizar a função...
                                    onMouseLeave={function handler(event){
                                        console.log("Mouse saiu: ", event);
                                    }}
                                />
                                <Text tag="strong">
                                    @{mensagem.de}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '20px',
                                        //marginLeft: '4px',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {(new Date().toLocaleDateString())}
                                </Text>
                            </Box>
                            {mensagem.texto}
                        </Text>
                    );
            })}            
        </Box>
    )
}