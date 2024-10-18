import org.springframework.scheduling.annotation.Scheduled;

@Service
public class KeepAliveService {
    @Scheduled(fixedRate = 600000) 
    public void pingMyApp() {
        try {
           System.out.println("System is running");
        } catch (Exception e) {
          
        }
    }
}
