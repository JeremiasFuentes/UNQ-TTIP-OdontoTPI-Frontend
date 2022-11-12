import '../App.css';
import React, { useEffect, useState, onSubmit } from 'react';

const Extraccion = () => {
    

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
            position:"absolute",top:"20px",right:"20px"}}></button>
        </div>
        <div class="btn-group dropstart">
            <button type="button" className='rectangle'style={{
            position:"absolute",top:"70px",right:"20px"}}></button>
        </div>
        </div>
        
    )
}
export default Extraccion