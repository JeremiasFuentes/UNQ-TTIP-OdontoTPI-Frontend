import '../App.css';
import React, { useEffect, useState, onSubmit } from 'react';

const Faltante = () => {
    

    return(
        <div className="odontograma">
        <div class="btn-group dropstart">
            <button type="button" className='trapezoid dropdown-toggle' data-bs-toggle='dropdown' aria-expanded="false"></button>
            
        </div>
        <div class="btn-group dropstart">
            <button type="button" className='trapezoid dropdown-toggle' data-bs-toggle='dropdown' aria-expanded="false" style={{
            rotate: '90deg',position:"absolute",top:"-10px",right:"55px"}}></button>
         
        </div>
        <div class="btn-group dropstart">
            <button type="button" className='trapezoid dropdown-toggle' data-bs-toggle='dropdown' aria-expanded="false" style={{
            rotate: '0deg',position:"absolute",top:"45px",right:"0px"}}></button>
      
        </div>
        <div class="btn-group dropstart">
            <button type="button" className='trapezoid dropdown-toggle' data-bs-toggle='dropdown' aria-expanded="false" style={{
            rotate: '-90deg',position:"absolute",top:"-10px",right:"-55px"}}></button>
  
        </div>
        <div class="btn-group dropstart">
            <button type="button" className='square dropdown-toggle' data-bs-toggle='dropdown' aria-expanded="false" style={{
            rotate: '-90deg',position:"absolute",top:"20px",right:"60px"}}></button>
        </div>
        <div class="btn-group dropstart">
            <button type="button" className='rectangle'style={{
            backgroundColor: 'red',position:"absolute",top:"45px",right:"20px",rotate:'-45deg'}}></button>
        </div>
        <div class="btn-group dropstart">
            <button type="button" className='rectangle'style={{
            backgroundColor: 'red' ,position:"absolute",top:"45px",right:"20px", rotate:'45deg'}}></button>
        </div>
        </div>
        
    )
}
export default Faltante