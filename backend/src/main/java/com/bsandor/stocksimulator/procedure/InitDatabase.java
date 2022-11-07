package com.bsandor.stocksimulator.procedure;

import com.bsandor.stocksimulator.models.transaction.TransactionHistory;
import com.bsandor.stocksimulator.models.user.ERole;
import com.bsandor.stocksimulator.models.user.Role;
import com.bsandor.stocksimulator.models.user.User;
import com.bsandor.stocksimulator.models.wallet.Wallet;
import com.bsandor.stocksimulator.repository.RoleRepository;
import com.bsandor.stocksimulator.repository.TransactionRepository;
import com.bsandor.stocksimulator.repository.UserRepository;
import com.bsandor.stocksimulator.repository.WalletRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Component
@Transactional
@Slf4j
public class InitDatabase {

    RoleRepository roleRepository;
    UserRepository userRepository;
    WalletRepository walletRepository;
    TransactionRepository transactionRepository;

    @Autowired
    public InitDatabase(RoleRepository roleRepository, UserRepository userRepository, WalletRepository walletRepository,
                        TransactionRepository transactionRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.walletRepository = walletRepository;
        this.transactionRepository = transactionRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void init() {
        log.info("Initializing database");
        initRoles();
        restoreMissingDbEntities();
    }

    public void initRoles() {
        for (ERole role : ERole.values()) {
            if (!roleRepository.existsByName(role)) {
                Role newRole = new Role(role);
                roleRepository.save(newRole);
            }
        }
    }

    // Restore missing empty wallets and transaction histories that may have been deleted by database clearing
    public void restoreMissingDbEntities() {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            if (user.getWallet() == null) {
                Wallet wallet = new Wallet(0.0, new HashMap<>());
                user.setWallet(wallet);
                walletRepository.save(wallet);
                userRepository.save(user);
            }
            if (user.getTransactionHistory() == null) {
                TransactionHistory transactionHistory = new TransactionHistory();
                user.setTransactionHistory(transactionHistory);
                transactionRepository.save(transactionHistory);
                userRepository.save(user);
            }
        }
    }

}
