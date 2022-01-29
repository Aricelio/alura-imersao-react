import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

function Titulo(props){    
    const Tag = props.tag || "h1";
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color:${appConfig.theme.colors.neutrals['050']};
                    font-size: 24px;
                    font-weight: 600;
                }    
            `}</style>
        </>
    );
}

export default function PaginaInicial() {
    //const username = 'Aricelio';
    const [username, setUsername] = React.useState('Aricelio');
    const roteamento = useRouter();
    const imagem = "https://github.com/Aricelio.png"
  
    return (
      <>        
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            //backgroundColor: appConfig.theme.colors.primary[500],
            //backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
            backgroundImage: 'url(https://www.pixel4k.com/wp-content/uploads/2019/03/call-of-cthulhu-4k_1553074544.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={ function(infosDoEvento){
                infosDoEvento.preventDefault();
                //console.log("Form submetido");
                //window.location.href = '/chat';
                roteamento.push('/chat');
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Boas vindas de volta!</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>
  
              {/*
              <input 
                type="text" 
                value={username}
                onChange={function handler(event){
                  console.log("Usuario digitou: ", event.target.value)
                  
                  // Valor
                  const valor = event.target.value;

                  // Troca o valor da variavel através do React
                  setUsername(valor);

                }}
              />
              */}

              <TextField
                value={username}
                onChange={function handler(event){
                  //console.log("Usuario digitou: ", event.target.value)
                  
                  // Valor
                  const valor = event.target.value;
                  
                  console.log("Tamanho: ", valor.length);

                  // Troca o valor da variavel através do React                  
                  setUsername(valor);
                }}

                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              />              

              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={
                  username.length > 2 ? `https://github.com/${username}.png` : imagem
                }
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
}

// Componente React
//function HomePage() {    
//JSX
// return (
//     <div>
//         <GlobalStyle></GlobalStyle>
//         <Titulo tag="h2">Boas vindas de volta!</Titulo>    
//         <h2>Discord - Alura Matrix</h2>            
//     </div>        
// )
//}
//export default HomePage