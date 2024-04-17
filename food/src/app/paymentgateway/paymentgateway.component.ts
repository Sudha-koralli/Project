import { Component,HostListener} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from '../Services/payment.service';
declare var Razorpay: any;
@Component({
  selector: 'app-paymentgateway',
  templateUrl: './paymentgateway.component.html',
  styleUrls: ['./paymentgateway.component.scss']
})
/*export class PaymentgatewayComponent implements OnInit {
 
  constructor() { }
 
  ngOnInit(): void {
  }
 //
}*/
export class PaymentgatewayComponent {
  title = 'demo';
 
  form: any = {};
  constructor(private http: HttpClient,
    private paymentService:PaymentService) {
 
  }
 
  ngOnInit() {
   
 
  }
 
  sayHello() {
    alert("Hello DK");
  }
 
  paymentId: string;
  error: string;
 
  options = {
    "key": "",
    "amount": "",
    "name": "Foodfunapp",
    "description": "OnlineFoodDelivery",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOVHDyOq-G2nM1sQVk5ICoR84Fsmd_MTzwAF1rhEg7lEdovP8Wryzw8apfmH0oH3M5EAI&usqp=CAU",
    "order_id":"",
    "handler": function (response){
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );    
      window.dispatchEvent(event);
    }
    ,
    "prefill": {
    "name": "",
    "email": "",
    "contact": ""
    },
    "notes": {
    "address": ""
    },
    "theme": {
    "color": "#3399cc"
    }
    };
 
    onSubmit(): void {
      this.paymentId = '';
      this.error = '';
      this.paymentService.createOrder(this.form).subscribe(
      data => {
        this.options.key = data.secretId;
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.applicationFee; //paise
        this.options.prefill.name = "Foodfunapp";
        this.options.prefill.email = "foodfunapp@gmail.com";
        this.options.prefill.contact = " ";
       
        if(data.pgName ==='razor2') {
          this.options.image="";
          var rzp1 = new Razorpay(this.options);
          rzp1.open();
        } else {
          var rzp2 = new Razorpay(this.options);
          rzp2.open();
        }
       
               
        rzp1.on('payment.failed', function (response){    
          // Todo - store this information in the server
          console.log(response);
          console.log(response.error.code);    
          console.log(response.error.description);    
          console.log(response.error.source);    
          console.log(response.error.step);    
          console.log(response.error.reason);    
          console.log(response.error.metadata.order_id);    
          console.log(response.error.metadata.payment_id);
          this.error = response.error.reason;
        }
        );
      }
      ,
      err => {
        this.error = err.error.message;
      }
      );
    }
 
    @HostListener('window:payment.success', ['$event'])
    onPaymentSuccess(event): void {
       console.log(event.detail);
    }
}