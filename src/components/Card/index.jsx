import React from 'react'
import { FiThumbsUp } from 'react-icons/fi'
import { 
  CardContainer,
  ImageBackground,
  Content,
  UserInfo,
  UserPicture,
  PostInfo,
  HasInfo,
} from './styles'

const Card = () => {
    return (
        <CardContainer>
          <ImageBackground src="https://media.licdn.com/dms/image/C4D16AQF0MkH-4aifAg/profile-displaybackgroundimage-shrink_200_800/0/1638381800387?e=2147483647&v=beta&t=iaaY50O0mgDBNkbaRL8zBMNceYSo6H-u0aqJP4g8cn8"/>
          <Content>
            <UserInfo>
            <UserPicture src="https://avatars.githubusercontent.com/u/98335519?v=4"/>
              <div>
                <h4>
                  João Lucas
                </h4>
                <p>Há 8 minutos</p>
              </div>
            </UserInfo>
            <PostInfo>
              <h4>Projeto para curso de formação em React</h4>
              <p>Projeto feito o curso de React na DIO <strong>Saiba Mais</strong></p>
            </PostInfo>
            <HasInfo>
              <h4> #REACT #CSS #JAVASCRIPT</h4>
              <p>
                <FiThumbsUp />10
              </p>
              
            </HasInfo>
          </Content>
        </CardContainer>
    )
}

export { Card }