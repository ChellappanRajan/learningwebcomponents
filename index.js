class ModalComponent extends HTMLElement{

    constructor(){
        super();
       this.isOpen = false;
        this.attachShadow({mode:'open'});

        this.shadowRoot.innerHTML=`
        <style>
      
        #modal-overlay{
            background: rgba(0,0,0,0.75);
            width:100%;
            height:100vh;
            opacity:0;
        }
       .modal{
           height:10rem;          
           width:200px;
           top:40%;
           position:fixed;
           background:white;                  
           left:40%;
           z-index:10;
           display:flex;
           align-items: center;
           justify-content: space-between;
           flex-direction: column;  
          border-radious: 10px;
          opacity:0;
          pointer-events:none;
          padding:1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
       }
       .modal-footer{
           align-self: flex-end;
       }
       .modal-header{
        align-self: flex-end;      
       }
       button{
           padding:5px;
       }
       :host([open]) .modal , :host([open]) #modal-overlay{
           opacity:1;
           pointer-events:all;
       }
      

        
        </style>

        <div id="modal-overlay"> 
        </div>

        <div class="modal">
          <section class="modal-header">
          <span id="close" >X</span>
          </section>
          <section class="body">
          <slot name="body" ></slot>
          </section>
          <section class="modal-footer">
                <button id="confirm">
                <slot name="confirm" >
                </slot>
                </button>
                <button id="cancel">
                <slot  name= "cancel">
                </slot>
                </button>
          </section>
        </div>
    `;
      
    }
    connectedCallback(){
        // console.log(this.hasAttribute('open'));
     let cancel =   this.shadowRoot.getElementById('cancel');
    //  cancel.addEventListener('cancel',()=>console.log('Dispatched'))
        cancel.addEventListener('click',(event)=>{
            
            this.hide(event);
            let cancel = new Event('cancel', { bubbles: true, composed: true });
            event.target.dispatchEvent(cancel);
            
        //One Way to do Modal
        //    this.shadowRoot.getElementById('modal-overlay').style.display = 'none';
        //    this.shadowRoot.querySelector('.modal').style.display = 'none';


        

        })
    let confirm = this.shadowRoot.getElementById('confirm')
        confirm.addEventListener('click', (event)=>{
           
         this.hide(event);
         let confirm = new Event('confirm');
         this.dispatchEvent(confirm);
        })
    }
    open(){

    //One way to implement the Modal opening 
        // this.shadowRoot.getElementById('modal-overlay').style.display = 'block';
        // this.shadowRoot.querySelector('.modal').style.display = 'block';

    //Another way
    this.setAttribute('open', '');
    
    }

    hide(event) {
        this.removeAttribute('open');
        //The event only available only inside shadow Dom if we want to listen outside shadowShow 
        //We need to pass second argument to the event Object we should add composed to expose the 
        //cancel event to outside shadow dom


    }

    /*
        attributeChangedCallback: Invoked each time one of the custom element's attributes is added, 
        removed, or changed. Which attributes to notice change for is specified in a static get 
        observedAttributes method
    */

    attributeChangedCallback(name, oldValue, newValue){
        this.isOpen != this.isOpen;
        // console.log('Has Attrubute',oldValue, newValue);
    }

    /*
    Note that to get the attributeChangedCallback() callback to fire when an attribute changes, 
    you have to observe the attributes. This is done by specifying a static get observedAttributes() 
    method inside custom element class - this should return  an array containing the names of the attributes 
    you want to observe:
    */

    static get observedAttributes() {
        return ['open'];
    }

}

//Define a Custom Element
customElements.define('cn-modal', ModalComponent);
