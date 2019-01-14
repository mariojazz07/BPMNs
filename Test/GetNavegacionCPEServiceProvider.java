/*
 * 
 */
package hn.com.tigo.tolcccserviceconsumer.bussines.f2.wsintegration;

import hn.com.tigo.josm.gateway.services.gateway.ComplexOrder;
import hn.com.tigo.josm.gateway.services.gateway.ExecuteComplexOrderService;
import hn.com.tigo.tolcccserviceconsumer.bussines.cpeinternetdata.ChildType;
import hn.com.tigo.tolcccserviceconsumer.bussines.cpeinternetdata.InternetData;
import hn.com.tigo.tolcccserviceconsumer.bussines.cpeinternetdata.ServicesType;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.GeneralResponse;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.getnavegation.NavigationData;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.getnavegation.NavigationResponse;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.getnavegation.NavigationTable;
import hn.com.tigo.tolcccserviceconsumer.common.Constantes;
import hn.com.tigo.tolcccserviceconsumer.util.DataBaseEJB;
import hn.com.tigo.tolcccserviceconsumer.util.LoggerUtil;
import hn.com.tigo.tolcccserviceconsumer.util.PlanDTO;
import hn.com.tigo.tolcccserviceconsumer.util.Utilidades;

import java.net.MalformedURLException;
import java.net.URL;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.persistence.PersistenceException;
import javax.xml.ws.BindingProvider;

import com.google.gson.Gson;
import com.tigo.josm.gateway.services.order.additionalparameterdto.v1.AdditionalParameters;
import com.tigo.josm.gateway.services.order.additionalparameterdto.v1.Parameter;
import com.tigo.josm.gateway.services.order.complexorderrequest.v1.ComplexOrderRequest;
import com.tigo.josm.gateway.services.order.complexorderrequest.v1.EnumOrderType;
import com.tigo.josm.gateway.services.order.complexorderrequest.v1.OrderRequestDetail;
import com.tigo.josm.gateway.services.order.orderresponse.v1.OrderResponse;
import com.tigo.josm.gateway.services.order.orderresponsedetail.v1.OrderResponseDetail;

/**
 * Class Service Provider that obtains information from subscriber Internet services.
 * @author ana.sorto
 * @since 10/02/2007
 * @version 1.0.0
 */
public class GetNavegacionCPEServiceProvider {

	private LoggerUtil log = new  LoggerUtil(GetNavegacionCPEServiceProvider.class);
	private URL url;

	/** The data base ejb. */
	public DataBaseEJB dataBaseEjb ;
	
	public GetNavegacionCPEServiceProvider(DataBaseEJB ejb) {
		dataBaseEjb = ejb;
	}

	/**
	 * Execute the ExecuteTask method.
	 *
	 * @param msisdn the msisdn
	 * @param trxid the trxid
	 * @return the subscriber all inf pcc service
	 * @throws MalformedURLException the malformed url exception
	 */
	public NavigationResponse getNavigationData(final String msisdn, final String trxid) throws MalformedURLException{
		url= new URL(Constantes.WSDL_CPE_COMPLEX_ORDER);
		NavigationResponse response = new NavigationResponse();
		try {
			ExecuteComplexOrderService service = new ExecuteComplexOrderService(url);
			ComplexOrder port = service.getPort(ComplexOrder.class);
			Map<String, Object> context = ((BindingProvider) port).getRequestContext();
			context.put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, Constantes.WSDL_CPE_COMPLEX_ORDER);  
			context.put(Constantes.REQUEST_TIMEOUT_WL, Constantes.CPE_COMPLEX_ORDER_REQUEST_TIMEOUT_VALUE); 
			context.put(Constantes.CONNECT_TIMEOUT_WL, Constantes.CPE_COMPLEX_ORDER_CONNECT_TIMEOUT_VALUE); 

			ComplexOrderRequest request = new ComplexOrderRequest();
			OrderRequestDetail detail = new OrderRequestDetail();
			AdditionalParameters additionals = new AdditionalParameters();
			Parameter parameter = new Parameter();
			
			request.setChannelId(Integer.valueOf(Constantes.CHANNELID_COMPLEX_ORDER));
			request.setComment(Constantes.COMMENT_COMPLEX_ORDER);
			request.setAllOrNothing(Boolean.TRUE);
			request.setExternalTransacionId(UUID.randomUUID().toString());
			
			detail.setSubscriberId(msisdn);
			detail.setProductId(Long.valueOf(Constantes.PRODUCT_ID_COMPLEX_ORDER));
			detail.setQuantity(Integer.valueOf(Constantes.QUANTITY_COMPLEX_ORDER));
			detail.setOrderType(EnumOrderType.TRANSFER);
			
			parameter.setKey(Constantes.TYPE_KEY_COMPLEX_ORDER);
			parameter.setValue(Constantes.TYPE_VALUE_COMPLEX_ORDER);
			additionals.getParameter().add(parameter);
			detail.setAdditionalParameters(additionals);
			request.getOrderRequestDetail().add(detail);
			
			OrderResponse result = port.execute(request);
			response = getResponseCPE(result, trxid, msisdn);
		} catch (Exception e) {
			log.error("Error general - GetNavegacion CPE Complex Order-  detalle: " + e.getMessage(), e);
			response.setResponseGeneral(getResponseGeneral(Constantes.CODIGO_ERROR,e.getMessage(), Constantes.STATUS_ERROR, Constantes.TYPE_TEC, trxid));
			response.setParameters(null);
		} 
		return response;
	}

	/**
	 * Convert Json String to object with list type attributes.
	 *
	 * @param jsonValueString the json value string
	 * @return the navegation info
	 */
	private InternetData getNavegationInfo(final String jsonValueString){
		return new Gson().fromJson(jsonValueString, InternetData.class);
	}

	
	/**
	 * Validate that the response objects are not empty.
	 *
	 * @param suscriberAllInf the suscriber all inf
	 * @return true, if successful
	 */
	private boolean validateData(final InternetData data){
		return data == null || data.getServices() == null;
	}

	/**
	 * Validate the service response code.
	 *
	 * @param result the result response type
	 * @param trxid the trxid
	 * @param msisdn 
	 * @return the response pcc subscriber
	 */
	private NavigationResponse getResponseCPE(final OrderResponse result, final String trxid, String msisdn) {
		NavigationResponse response = new NavigationResponse();
		boolean exito = false;
		if (result!=null && !result.getOrderResponseDetail().isEmpty()){
			for (OrderResponseDetail detail : result.getOrderResponseDetail()) {
				if(detail.getParameters()!=null){
					String responseCode = "-1";
					String responseMessage = "ERROR";
					String serviceJson = "";
					String billCycleDay = "";
					for (com.tigo.enterprise.resources.order.parameters.simple.v1.schema.ParameterType parameter : detail.getParameters().getParameter()) {
						if("BPMN_RESPONSE_CODE".equals(parameter.getName())){
							responseCode = parameter.getValue();
						}
						if("BPMN_RESPONSE_MESSAGE".equals(parameter.getName())){
							responseMessage = parameter.getValue();
						}
						if("SERVICES".equals(parameter.getName())){
							serviceJson = parameter.getValue();
						}
						if("BILLCYCLEDAY".equals(parameter.getName())){
							billCycleDay = parameter.getValue();
						}
					}
					if("0".equals(responseCode)){
						//PETICION EXITOSA
						response = getResponseSuccess(serviceJson, billCycleDay, trxid, responseMessage);
						exito = true;
					}else{
						//PETICION FALLIDA
						response.setResponseGeneral(getResponseGeneral(Constantes.CODIGO_ERROR, responseMessage,
								Constantes.STATUS_ERROR, Constantes.TYPE_TEC, trxid));
						exito = true;
					}
				}
			}
		}
		if (!(exito)){
			response.setResponseGeneral(getResponseGeneral(Constantes.CODIGO_ERROR,Constantes.MSG_OPERATION_FAILED,
					Constantes.STATUS_ERROR, Constantes.TYPE_TEC, trxid));
		}
		return response;
	}

	/**
	 * Returns the navigation data.
	 *
	 * @param serviceJson the parameter array
	 * @param billCycleDay the billCycleDay
	 * @param trxid the trxid
	 * @param responseMessage 
	 * @return the response success
	 */
	private NavigationResponse getResponseSuccess(final String serviceJson, final String billCycleDay, final String trxid, String responseMessage) {
		NavigationResponse response = new NavigationResponse();
		InternetData data = getNavegationInfo(serviceJson);

		if (!(validateData(data))){
			//Obtiene los servicios de navegacion
			response.setParameters(listServices(data.getServices(), billCycleDay));
			//Construye el General Response
			response.setResponseGeneral(getResponseGeneral(String.valueOf(Constantes.PCC_CODE_SUCCESS),
					responseMessage, Constantes.STATUS_OK, Constantes.TYPE_INF, trxid));
		}
		return response;
	}

	/**
	 * Get the dto with the service data and quotas consulted.
	 *
	 * @param list the result
	 * @param msisdn 
	 * @return the list
	 */
	private List<NavigationData> listServices(List<ServicesType> list, String billCycleDay) {
		List<NavigationData> tableList = getNavegationData(list, billCycleDay);
		return tableList.isEmpty()?null:tableList;
	}

	/**
	 * Scroll through the response to get the list of services.
	 * @param msisdn 
	 *
	 * @param result the result
	 * @param listHashQuota the list hash quota
	 * @return the navigation data
	 */
	private List<NavigationData> getNavegationData(final List<ServicesType> list, String billCycleDay) {
		List<NavigationData> tableList = new ArrayList<NavigationData>();
		for (ServicesType service : list) {
			List<NavigationTable> child = new ArrayList<NavigationTable>();
			NavigationData data = new NavigationData();
			NavigationTable itemTable = getItemTable(billCycleDay, service);
			for (ChildType childType : service.getChild()) {
				child.add(getItemChild(billCycleDay, childType));
			}
			data.setParentData(itemTable);
			data.setChildData(child);
			tableList.add(data);
		}
		return tableList;
	}

	/**
	 * Gets the item table.
	 *
	 * @param billCycleDay the bill cycle day
	 * @param service the service
	 * @return the item table
	 */
	private NavigationTable getItemTable(String billCycleDay, ServicesType service) {
		NavigationTable itemTable = new NavigationTable();
		itemTable.setEntitlement(service.getName());
		itemTable = getPlanData(itemTable);
		itemTable.setCuota(service.getQNAME());
		itemTable.setAsignadaMb(assignFormatMb(service.getQInitial(), Constantes.PCC_FORMAT_DECIMAL_ASIGNADA_MB));
		itemTable.setConsumidoMb(assignFormatMb(service.getQConsumption(), Constantes.PCC_FORMAT_DECIMAL_CONSUMIDO_MB));
		itemTable.setLibreMb(assignFormatMb(service.getQBalance(), Constantes.PCC_FORMAT_DECIMAL_LIBRE_MB));
		itemTable.setPorcentajeLibre(getPercentage(assignFormatMb(service.getQBalanceP(), Constantes.PCC_FORMAT_DECIMAL_PORCENTAJE)));
		itemTable.setFechaInicio(getValueDates(service.getStart(),itemTable.getTipo(), billCycleDay, 0));
		itemTable.setFechaExpiracion(getValueDates(service.getEnd(), itemTable.getTipo(), billCycleDay, 1));
		itemTable.setExpirado(service.getExpired());
		itemTable.setClaseCss(service.getClazz());
		return itemTable;
	}

	/**
	 * Gets the item child.
	 *
	 * @param billCycleDay the bill cycle day
	 * @param childType the child type
	 * @return the item child
	 */
	private NavigationTable getItemChild(String billCycleDay, ChildType childType) {
		NavigationTable itemTable = new NavigationTable();
		itemTable.setEntitlement(childType.getName());
		itemTable = getPlanData(itemTable);
		itemTable.setCuota(childType.getQNAME());
		itemTable.setAsignadaMb(assignFormatMb(childType.getQInitial(), Constantes.PCC_FORMAT_DECIMAL_ASIGNADA_MB));
		itemTable.setConsumidoMb(assignFormatMb(childType.getQConsumption(), Constantes.PCC_FORMAT_DECIMAL_CONSUMIDO_MB));
		itemTable.setLibreMb(assignFormatMb(childType.getQBalance(), Constantes.PCC_FORMAT_DECIMAL_LIBRE_MB));
		itemTable.setPorcentajeLibre(getPercentage(assignFormatMb(childType.getQBalanceP(), Constantes.PCC_FORMAT_DECIMAL_PORCENTAJE)));
		itemTable.setFechaInicio(getValueDates(childType.getStart(),itemTable.getTipo(), billCycleDay, 0));
		itemTable.setFechaExpiracion(getValueDates(childType.getEnd(), itemTable.getTipo(), billCycleDay, 1));
		itemTable.setExpirado(childType.getExpired());
		itemTable.setClaseCss(childType.getClazz());
		return itemTable;
	}

	/**
	 * Gets the value dates.
	 *
	 * @param valueAttribute the value attribute
	 * @param type the type
	 * @param subscriber 
	 * @return the value dates
	 */
	private  String getValueDates(final String valueAttribute2, final String type, final String usrBillCycleDate, final int typeDate){
		String response=null;
		String valueAttribute=valueAttribute2;
		try {
			//Tipo de servicio es Plan
			if (Constantes.PCC_TYPE_PLAN.equalsIgnoreCase(type) && typeDate==0){//FechaInicio: typeDate=0 , FechaFin: typeDate=1
				//Convierte a Numerico el valor de usrBillCycleDate
				long usrBillCycleNumber=Long.parseLong(usrBillCycleDate);
				//valida si usrBillCycleDate esta dentro del rango (1-31) caso contrario lo setea con 1
				usrBillCycleNumber=usrBillCycleNumber<1||usrBillCycleNumber>31?Constantes.PCC_DEFAULT_USRBILLCYCLEDATE:usrBillCycleNumber;
				//Convierte a Date el valor del atributo
				Calendar fechaAttribute = Calendar.getInstance();
				fechaAttribute=obtieneFechaPlan(usrBillCycleNumber);
				valueAttribute=Utilidades.dateToString(fechaAttribute.getTime(), Constantes.PCC_FORMAT_DATE);
			}else if(Constantes.PCC_INVALID_VALUE_DATE.equals(valueAttribute)) {
				return response;
			}
			response=Utilidades.cambiarStringFecha(valueAttribute, Constantes.PCC_FORMAT_DATE, Constantes.FECHA_CON_AM_PM);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
		return response;
	}

	/**
	 * Obtiene fecha plan.
	 *
	 * @param usrBillCycleNumber the usr bill cycle number
	 * @param fechaAttribute2 the fecha attribute2
	 * @return the calendar
	 */
	private Calendar obtieneFechaPlan(final long usrBillCycleNumber) {
		Calendar fechaActual= Calendar.getInstance();
		Calendar fechaAttribute=fechaActual;
		int yearActual=fechaActual.get(Calendar.YEAR);
		//usrBillCycleNumber es mayor a el dia del mes actual
		if (usrBillCycleNumber > fechaActual.get(Calendar.DAY_OF_MONTH)){
			int mesActual = fechaActual.get(Calendar.MONTH);
			fechaAttribute.set(yearActual, mesActual, (int)usrBillCycleNumber, Constantes.PCC_HOUR_DATE, Constantes.PCC_MIN_DATE, Constantes.PCC_SECOND_DATE);
		}else{
			//Le agrega un mes a la fecha del Atributo
			fechaActual.add(Calendar.MONTH, 1);
			int mesProximo = fechaActual.get(Calendar.MONTH);
			fechaAttribute.set(yearActual, mesProximo, (int)usrBillCycleNumber, Constantes.PCC_HOUR_DATE, Constantes.PCC_MIN_DATE, Constantes.PCC_SECOND_DATE);
		}
		return fechaAttribute;
	}

	/**
	 * Return value percentaje.
	 *
	 * @param percentage the percentage
	 * @return the percentage
	 */
	private String getPercentage(String percentage){
		if (percentage==null|| "".equals(percentage)){
			return null;
		}else{
			return percentage.concat(Constantes.PCC_PERCENTAGE);
		}
	}
	
	/**
	 * Gets the plan data.
	 *
	 * @param historico2 the historico2
	 * @return the plan data
	 */
	private NavigationTable getPlanData(final NavigationTable itemTableOld){
		NavigationTable itemTable = itemTableOld;
		try {
			PlanDTO plan = null;
			plan = dataBaseEjb.getDataPlanNavegacion(itemTable.getEntitlement());
			itemTable.setPlan(plan.getPlanName());
			itemTable.setTipo(getSvrTypes(plan.getName()));
		} catch (PersistenceException e) {
			log.error(e.getMessage(), e);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
		return itemTable;
	}

	/**
	 * Return value Service Type.
	 *
	 * @param valueSvrTypes the value svr types
	 * @return the svr types
	 */
	private String getSvrTypes(final String valueSvrTypes){
		Hashtable<String, String> types = new Hashtable<String, String>();
		String typeList=null;
		if (valueSvrTypes!=null){
			//OBTIENE LOS TIPOS DE PRODUCTOS
			String listSrvTypes[]= Constantes.PCC_LIST_TYPE.split(Constantes.SEPARATOR_TYPES);
			for (String type : listSrvTypes) {
				String[] item = type.split(Constantes.SEPARATOR_ITEM_TYPES);
				types.put(item[0].toUpperCase(), item[1]);
			}
			typeList = types.get(valueSvrTypes.toUpperCase());
		}
		return (typeList)==null?valueSvrTypes:typeList;
	}

	/**
	 * Returns general information about the transaction.
	 *
	 * @param code the code
	 * @param message the message
	 * @param status the status
	 * @param type the type
	 * @param trxid the trxid
	 * @return the response general
	 */
	private GeneralResponse getResponseGeneral(final String code, final String message, final String status, final String type, final String trxid){
		GeneralResponse responseGeneral= new GeneralResponse();
		responseGeneral.setCode(code);
		responseGeneral.setMessage(message);
		responseGeneral.setStatus(status);
		responseGeneral.setType(type);
		responseGeneral.setUti(trxid);
		return responseGeneral;
	}

	/**
	 * Assign format mb.
	 *
	 * @param initial the initial kb
	 * @return the string
	 */
	private String assignFormatMb(final String initial,final String format) {
		try {
			double value=0;
			String valueString= null;
			value=Double.parseDouble(initial);
			NumberFormat formatter = new DecimalFormat(format);
			valueString = formatter.format(value);
			return valueString;
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return null;
		}
	}
}