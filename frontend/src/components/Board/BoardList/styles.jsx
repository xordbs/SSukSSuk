import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
    .table-wrapper{
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
        box-shadow: none;

        .table-row{
            cursor:pointer;
        }
        .table-head{
            background: #ddd;
        }
    }
`;

export default Wrapper;
