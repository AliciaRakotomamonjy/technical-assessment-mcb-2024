using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;

namespace MyPlugIn
{
    public class Plugin : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            // Vérifiez que les paramètres d'entrée existent
            if (context.InputParameters.Contains("email") && context.InputParameters.Contains("raison"))
            {
                string email = context.InputParameters["email"].ToString();
                string raison = context.InputParameters["raison"].ToString();

                Entity customEntity = new Entity("InviteDecline");

                customEntity["email"] = email;
                customEntity["raison"] = raison;
                customEntity["dateDecline"] = DateTime.Now;

                // Créer l'entité dans la base de données
                service.Create(customEntity);
            }
            else
            {
                throw new InvalidPluginExecutionException("Les paramètres 'email' et 'raison' doivent être fournis.");
            }
        }
    }
}
