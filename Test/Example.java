
package hn.com.tigo.tolcccserviceconsumer.ws;

import java.net.MalformedURLException;

import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.getnavegation.NavigationResponse;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.wsintegration.GetNavegacionCPEServiceProvider;
import hn.com.tigo.tolcccserviceconsumer.util.DataBaseEJB;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

/**
 *
 * @author kenny.cooper
 * @version 1.0.0
 * @since 06/06/2017
 */
@WebService
@Stateless(name = "GetNavigationDataCPEService", mappedName = "ejb/GetNavigationDataCPEService")
@LocalBean
public class GetNavigationDataCPE {

	/** The data base ejb. */
	@EJB
	public DataBaseEJB dataBaseEjb;
	
	/**
	 * Gets the navigation data CPE service.
	 *
	 * @param msisdn the msisdn
	 * @param trxid the trxid
	 * @return the navigation data CPE service
	 * @throws MalformedURLException the malformed URL exception
	 */
	@WebMethod
	public NavigationResponse getNavigationDataCPEService(@WebParam(name = "usrIdentifier") String msisdn, @WebParam(name = "transactionId") String trxid) throws MalformedURLException {
		GetNavegacionCPEServiceProvider business = new GetNavegacionCPEServiceProvider(dataBaseEjb);
		return business.getNavigationData(msisdn, trxid);
	}
	
	
}