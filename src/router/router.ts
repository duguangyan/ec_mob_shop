import {SettingsComponent} from '../app/pages/settings/settings.component';
import {Routes} from '@angular/router';
import {LoginComponent} from '../app/login/login.component';
import {MainComponent} from '../app/main/main.component';
import {HomeComponent} from '../app/pages/home/home.component';
import {SearchComponent} from '../app/pages/search/search.component';
import {ExplainComponent} from '../app/pages/home/explain/explain.component';
import {ForgetPasswordComponent} from '../app/login/forget-password/forget-password.component';
import {RegisterComponent} from '../app/login/register/register.component';
import {ProtocolComponent} from '../app/login/register/protocol/protocol.component';
import {PaymentComponent} from '../app/payment/payment.component';
import {PayDoingComponent} from '../app/payment/pay-doing/pay-doing.component';
import {PaySuccessComponent} from '../app/payment/pay-success/pay-success.component';
import {ShopComponent} from '../app/pages/shop/shop.component';
import {HomeProductDetailsComponent} from '../app/pages/home/home-product-details/home-product-details.component';
import {ShoppingCartComponent} from '../app/pages/shopping-cart/shopping-cart.component';
import {ProductPicShowComponent} from '../app/pages/home/home-product-details/product-pic-show/product-pic-show.component';
import {ProductAmountComponent} from '../app/pages/home/home-product-details/product-pic-show/product-amount/product-amount.component';
import {ProductSearchComponent} from '../app/pages/home/product-search/product-search.component';
import {ProductSearchListComponent} from '../app/pages/home/product-search/product-search-list/product-search-list.component';
import {ProductSearchListSupernatantComponent} from '../app/pages/home/product-search/product-search-list/product-search-list-supernatant/product-search-list-supernatant.component';
import {HomeFiltrateDetailComponent} from '../app/pages/home/home-filtrate-detail/home-filtrate-detail.component';
import {HomeProductDemandComponent} from '../app/pages/home/home-product-details/home-product-demand/home-product-demand.component';
import {ShoppingOrderMessageComponent} from '../app/pages/shopping-cart/shopping-order-message/shopping-order-message.component';
import {ShoppingOrderInvoiceComponent} from '../app/pages/shopping-cart/shopping-order-invoice/shopping-order-invoice.component';
import {ShoppingOrderDebitnoteComponent} from '../app/pages/shopping-cart/shopping-order-debitnote/shopping-order-debitnote.component';
import {ShoppingOrderAddressComponent} from '../app/pages/shopping-cart/shopping-order-address/shopping-order-address.component';
import {ShoppingOrderCreateAddressComponent} from '../app/pages/shopping-cart/shopping-order-address/shopping-order-create-address/shopping-order-create-address.component';
import {ShoppingOrderOnlinePaymentComponent} from '../app/pages/shopping-cart/shopping-order-online-payment/shopping-order-online-payment.component';
import {ShoppingOrderPaymentSuccessComponent} from '../app/pages/shopping-cart/shopping-order-payment-success/shopping-order-payment-success.component';
import {ShoppingOrderListComponent} from '../app/pages/shopping-cart/shopping-order-list/shopping-order-list.component';
import {ShoppingOrderListDetailComponent} from '../app/pages/shopping-cart/shopping-order-list-detail/shopping-order-list-detail.component';
import {ShoppingOrderTransportationComponent} from '../app/pages/shopping-cart/shopping-order-transportation/shopping-order-transportation.component';
import {SettingsCenterComponent} from '../app/pages/settings/settings-center/settings-center.component';
import {SettingsMessageComponent} from '../app/pages/settings/settings-message/settings-message.component';
import {SettingsNicknameComponent} from '../app/pages/settings/settings-nickname/settings-nickname.component';
import {SettingsPhoneComponent} from '../app/pages/settings/settings-phone/settings-phone.component';
import {SettingsPassworldComponent} from '../app/pages/settings/settings-passworld/settings-passworld.component';
import {ShoppingOrderEditAddressComponent} from '../app/pages/shopping-cart/shopping-order-address/shopping-order-edit-address/shopping-order-edit-address.component';
import {WxLoginCallbackComponent} from '../app/login/wx-login-callback/wx-login-callback.component';
import {RechargeComponent} from '../app/payment/recharge/recharge.component';
import {RechargeListComponent} from '../app/payment/recharge/recharge-list/recharge-list.component';
import {RechargeOrderDebitnoteComponent} from '../app/payment/recharge/recharge-order-debitnote/recharge-order-debitnote.component';
import {ShoppingOrderSubmitSuccessComponent} from '../app/pages/shopping-cart/shopping-order-submit-success/shopping-order-submit-success.component';
import {FindListDetailComponent} from '../app/pages/settings/find-list-detail/find-list-detail.component';
import {FindListComponent} from '../app/pages/settings/find-list/find-list.component';
import {PartnerComponent} from '../app/pages/partner/partner.component';
import {TransportComponent} from '../app/pages/transport/transport.component';
import {ProductSearchCeshiComponent} from '../app/pages/home/product-search/product-search-list/product-search-ceshi/product-search-ceshi.component';
import {PayComponent} from '../app/pages/shopping-cart/shopping-order-online-payment/pay/pay.component';

export const ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'wx-login-callback',
    component: WxLoginCallbackComponent,
  },
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'protocol',
    component: ProtocolComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
  },
  {
    path: 'paydo',
    component: PayDoingComponent,
  },
  {
    path: 'paysuccess',
    component: PaySuccessComponent,
  },
  {
    path: 'find-list-detail',
    component: FindListDetailComponent,
  },
  {
    path: 'find-list',
    component: FindListComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'home-explain',
    component: ExplainComponent
  },
  {
    path: 'home-product-details',
    component: HomeProductDetailsComponent
  },
  {
    path: 'product-pic-show',
    component: ProductPicShowComponent,
  },
  {
    path: 'product-amount',
    component: ProductAmountComponent,
  },
  {
    path: 'product-search',
    component: ProductSearchComponent,
  },
  {
    path: 'product-search-list',
    component: ProductSearchListComponent,
  },
  {
    path: 'product-search-list-supernatant',
    component: ProductSearchListSupernatantComponent,
  },
  {
    path: 'home-filtrate-detail',
    component: HomeFiltrateDetailComponent,
  },
  {
    path: 'home-product-demand',
    component: HomeProductDemandComponent,
  },
  {
    path: 'shopping-order-message',
    component: ShoppingOrderMessageComponent,
  },
  {
    path: 'shopping-order-invoice',
    component: ShoppingOrderInvoiceComponent,
  },
  {
    path: 'shopping-order-debitnote',
    component: ShoppingOrderDebitnoteComponent,
  },
  {
    path: 'shopping-order-address',
    component: ShoppingOrderAddressComponent,
  },
  {
    path: 'shopping-order-create-address',
    component: ShoppingOrderCreateAddressComponent,
  },
  {
    path: 'shopping-order-edit-address',
    component: ShoppingOrderEditAddressComponent,
  },
  {
    path: 'shopping-order-online-payment',
    component: ShoppingOrderOnlinePaymentComponent,
  },
  {
    path: 'shopping-order-payment-success',
    component: ShoppingOrderPaymentSuccessComponent,
  },
  {
    path: 'shopping-order-list',
    component: ShoppingOrderListComponent,
  },
  {
    path: 'shopping-order-list-detail',
    component: ShoppingOrderListDetailComponent,
  },
  {
    path: 'shopping-order-transportation',
    component: ShoppingOrderTransportationComponent,
  },
  {
    path: 'shopping-order-submit-success',
    component: ShoppingOrderSubmitSuccessComponent,
  },

  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
  },
  {
    path: 'settings-center',
    component: SettingsCenterComponent,
  },
  {
    path: 'sttings-message',
    component: SettingsMessageComponent,
  },
  {
    path: 'settings-nickname',
    component: SettingsNicknameComponent,
  },
  {
    path: 'settings-phone',
    component: SettingsPhoneComponent,
  },
  {
    path: 'settings-passworld',
    component: SettingsPassworldComponent,
  },
  {
    path: 'recharge',
    component: RechargeComponent,
  },
  {
    path: 'recharge-list',
    component: RechargeListComponent,
  },
  {
    path: 'recharge-order-debitnote',
    component: RechargeOrderDebitnoteComponent,
  },
  {
    path: 'partner',
    component: PartnerComponent,
  },
  {
    path: 'transport',
    component: TransportComponent,
  },
  {
    path: 'product-search-ceshi',
    component: ProductSearchCeshiComponent,
  },
  {
    path: 'pay',
    component: PayComponent,
  }

];
